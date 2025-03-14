import AnonymousMessage from "../models/anon-message.model.js";
import AnonymousMessageLink from "../models/anon-message-link.model.js";
import Joi from "joi";
import { sendRes } from "../library/api.library.js";
import { encryptWithBaseKey, decryptWithBaseKey } from "../services/encryption.js";

export const createAnonMessage = async (req, res) => {
    const tag = "[anon-message.controller.js][createAnonMessage]";

    try {
        const schema = Joi.object({
            message: Joi.string().required(),
            linkId: Joi.string().required()
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                status: "failed"
            });
        }

        const { message, linkId } = value;
        const messageLink = await AnonymousMessageLink.findOne({ oid: linkId });
        if (!messageLink) {
            return sendRes(res, {
                message: "Message link not found",
                status: "failed"
            }, 404);
        }

        const encryptedMessage = encryptWithBaseKey(message);
        await AnonymousMessage.create({
            message: encryptedMessage,
            subscriber: req.user.id
        });

        return sendRes(res, {
            message: "Message created successfully",
            status: "success"
        }, 201);

    } catch (error) {
        console.log(`${tag} Error:`, error);
        return sendRes(res, {
            message: "Something went wrong",
            status: "error"
        }, 500);
    }
};

export const viewAnonMessage = async (req, res) => {
    const tag = "[anon-message.controller.js][viewAnonMessage]";

    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.params);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                status: "failed"
            });
        }

        const { id } = value;

        const foundAnonMessage = await AnonymousMessage.findById(id);
        if (!foundAnonMessage) {
            return sendRes(res, {
                message: "No message found",
                status: "failed"
            }, 404);
        }

        const decryptedMessage = decryptWithBaseKey(foundAnonMessage.message);
        return sendRes(res, {
            message: "Message retrieved",
            status: "success",
            data: { message: decryptedMessage }
        }, 200);

    } catch (error) {
        console.log(`${tag} Error:`, error);
        return sendRes(res, {
            message: "Something went wrong",
            status: "error"
        }, 500);
    }
};

export const getAnonMessages = async (req, res) => {
    const tag = "[anon-message.controller.js][getAnonMessages]";

    try {
        const messages = await AnonymousMessage.find({ user: req.user.id });

        if (messages.length < 1) {
            return sendRes(res, {
                message: "No messages found",
                status: "failed"
            }, 404);
        }

        return sendRes(res, {
            message: "Messages fetched successfully",
            status: "success",
            data: { messages }
        }, 200);

    } catch (error) {
        console.log(`${tag} Error:`, error);
        return sendRes(res, {
            message: "Something went wrong",
            status: "error"
        }, 500);
    }
};