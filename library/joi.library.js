import mongoose from "mongoose";

export const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message({ custom: "Invalid ObjectId format" });
    }
    return value;
}


export const msisdn = (value, helpers) => {
    const regex = /^233[0-9]{9}$/
    if (!regex.test(value)) {
        return helpers.message({ custom: "Invalid phone number format"});
    }
    return value;
}