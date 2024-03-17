import mongoose, { Document } from "mongoose";

declare interface IRefreshToken extends Document{
    readonly token: string;
    readonly userId: string;
    readonly expiresAt: Date;

}
const tokenSchema = new mongoose.Schema<IRefreshToken>({
    userId: {
        type: String,
        required: true,
        ref:"User"
    },
    token: {
        type: String,
        required: true
    },


})

const TokenMOdel = mongoose.model("Token", tokenSchema)
export default TokenMOdel