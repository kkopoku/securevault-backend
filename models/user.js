import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"


const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    otherNames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["subscriber", "admin"]
    }
})


userSchema.methods.createJWT = () => {
    return jwt.sign(
        {
            id: this.id,
            firstName: this.firstName,
            otherNames: this.otherNames,
            email: this.email,
            password: this.password
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    );
};


userSchema.methods.comparePassword = async (candidatePassword) => {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};


userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        next(error);
    }
});

const User = model('User', UserSchema)
export default User