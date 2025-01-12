import { Schema, model } from "mongoose"
import User from "./user.model"


const AdminSchema = new Schema({
    roles: {
        type: Array,
        required: false,
        default: []
    }
}, {discriminatorKey: "type"})


const Admin = User.discriminator("admin", AdminSchema)
export default Admin
