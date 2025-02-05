const { Schema } = require("mongoose")
const User = require("./user.model")


const AdminSchema = new Schema({
    roles: {
        type: Array,
        required: false,
        default: []
    }
}, {discriminatorKey: "type"})


const Admin = User.discriminator("admin", AdminSchema)

module.exports = Admin
