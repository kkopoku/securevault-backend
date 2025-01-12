import { Response } from "express";

/**
 * 
 * @param {Response} res 
 * @param {any} data 
 * @param {String} message 
 * @param {Number} statusCode s
 * @returns 
 */
export const sendRes = (res, response, statusCode) => {
    if (typeof response.status !== "string" || typeof response.message !== "string") {
        throw new Error("Response does not match the ApiResponse contract");
    }
    if (response.data && typeof (response.data) === "object" && "password" in response.data) {
        delete response.data.password
    }

    const statuses = ["failed", "success", "error"]
    if (!response.status || !statuses.includes(response.status)) throw new Error("Response does not match the ApiResponse contract");

    if (!response.data) response.data = null
    return res.status(statusCode).json(response);
}