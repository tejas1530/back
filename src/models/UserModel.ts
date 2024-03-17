import mongoose, { Document } from "mongoose";


declare interface IUser extends Document {
    readonly  name: string;
    readonly email: string;
   readonly password: string;
    readonly role: string;
    readonly phone: number;
 }
 
const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
})

const UserModel = mongoose.model("Users", userSchema)

export default UserModel