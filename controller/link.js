const Link = require("../models/link");
const { generateRandomString } = require("../utils");
const sendEmail = require("../services/email")

const createLink = async (req, res) => {
  const { message, viewNumber, lifetime, passphrase, recipient } = req.body;
  const baseURL = process.env.SECUREVAULT_WEB;
  const rand = generateRandomString(4);

    //TO DO: Validate inputs
  if (!message || !viewNumber || !lifetime) {
    return res.status(400).json({
      message: "Please fill in all required fields",
    });
  }

  try {
    const link = await Link.create({
      message: message,
      viewNumber: viewNumber,
      lifetime: lifetime,
      my_id: rand,
      link: `${baseURL}${rand}`,
      passphrase: passphrase ?? null,
      recipient: recipient
    });
    
    if(recipient){
      const message = `SECUREVALUT ALERTS\nA secure message has been sent to you. Kindly click the link below to access your secure message:\nLink: ${link.link}\nPassword: ${passphrase ?? 'n/a'}`
      sendEmail(recipient, "SecureVault Alert", message)
    }

    res.status(201).json({
      message: "link created successfully",
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

    if (!foundLink || foundLink.expires_at < Date.now() ) {
      if (foundLink) await foundLink.deleteOne();
      return res.status(404).json({
        message: "Link not found",
      });
    }

    if(foundLink.passphrase){
        if ( !(foundLink.passphrase == passphrase) ){
            return res.status(401).json({
                message: "Incorrect passphrase",
              });
        }
    }


    if (foundLink.viewNumber >= 2) {
      foundLink.viewNumber--;
      await foundLink.save();
    } else {
      await foundLink.deleteOne();
    }

    res.status(200).json({
      message: foundLink.message,
    });
  } catch (error) {
    console.error("Error in getLinkDetails:", error);
    res.status(500).json({
      message: "An error occurred while fetching link details",
    });
  }
};

module.exports = { createLink, getLinkDetails };
