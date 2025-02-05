const Link = require("../models/link");
const { generateRandomString } = require("../utils");
const sendEmail = require("../services/email");
const { runTest, encryptWithBaseKey, encryptWithUserPassphrase, decryptWithBaseKey, decryptWithUserPassphrase } = require("../services/encryption");
const linkCreatedQueue = require("../jobs/link-created.job")

const createLink = async (req, res) => {
  const { message, viewNumber, lifetime, passphrase, recipient } = req.body;
  const baseURL = process.env.SECUREVAULT_WEB;
  const rand = generateRandomString(4);

  // Validate inputs
  if (!message || !viewNumber || !lifetime) {
    return res.status(400).json({
      message: "Please fill in all required fields",
    });
  }

  let encryptedMessage = "";
  if (passphrase) {
    encryptedMessage = encryptWithUserPassphrase(message, passphrase);
  }else{
    encryptedMessage = encryptWithBaseKey(message);
  }

  try {
    const link = await Link.create({
      message: encryptedMessage,
      viewNumber: viewNumber,
      lifetime: lifetime,
      my_id: rand,
      link: `${baseURL}${rand}`,
      passphrase: passphrase ?? null,
    });

    if (recipient) {
      const emailMessage = `SECUREVAULT ALERTS\nA secure message has been sent to you. Kindly click the link below to access your secure message:\nLink: ${link.link}\nPassword: ${passphrase ? passphrase :"n/a"}`;
      try {
        await sendEmail(recipient, "SecureVault Alert", emailMessage);
        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    }

    linkCreatedQueue.add();

    res.status(201).json({
      message: "Link created successfully",
      link: link,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Something went wrong while processing the request",
    });
  }
};

const getLinkDetails = async (req, res) => {
  try {
    const { id, passphrase } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "Please provide an id",
      });
    }

    const foundLink = await Link.findOne({ my_id: id });

    if (!foundLink || foundLink.expires_at < Date.now()) {
      if (foundLink) await foundLink.deleteOne();
      return res.status(404).json({
        message: "Link not found",
      });
    }

    if(foundLink.passphrase){
      if(!passphrase){
        return res.status(401).json({
          message: "Please provide a passphrase",
        });
      }else{
        const isMatch = await foundLink.comparePassphrase(passphrase);
        if (!isMatch) {
          return res.status(401).json({
            message: "Incorrect passphrase",
          });
        }
      }
    }

    if (foundLink.viewNumber >= 2) {
      foundLink.viewNumber--;
      await foundLink.save();
    } else {
      await foundLink.deleteOne();
    }

    let decryptedMessage = foundLink.passphrase ? 
      decryptWithUserPassphrase(foundLink.message, passphrase) 
      : decryptWithBaseKey(foundLink.message);

    res.status(200).json({
      message: decryptedMessage,
    });
  } catch (error) {
    console.error("Error in getLinkDetails:", error);
    res.status(500).json({
      message: "An error occurred while fetching link details",
    });
  }
};


const testing = async (req, res) => {
  console.log("It is getting here!");
  let result = runTest();
  res.status(200).json({
    message: "Testing route",
    result
  });
}


module.exports = { createLink, getLinkDetails, testing };
