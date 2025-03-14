import { Schema } from "mongoose"
import User from "./user.model.js"


const AdminSchema = new Schema({
    roles: {
        type: Array,
        required: false,
        default: []
    }
}, {discriminatorKey: "type"})


const Admin = User.discriminator("admin", AdminSchema)

export default Admin
