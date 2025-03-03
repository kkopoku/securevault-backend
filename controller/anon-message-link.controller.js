import AnonymousMessageLink from "../models/anon-message-link.model.js";
import { generateRandomString } from "../utils.js";

export const createAnonMessageLink = async (req, res) => {
    const tag = "[anon-message-link.controller.js][createAnonMessageLink]";

    const oid = generateRandomString(4);

    try {
        await AnonymousMessageLink.create({
            oid,
            user: req.user.id
        });
        // dispatch anon link created event
    } catch (error) {
        console.log(`${tag} ${error}`);
        return sendRes(res, {
            message: "Internal Server Error",
            status: "failed"
        }, 500);
    }
};