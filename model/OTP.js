import mongoose from "mongoose";
import {mailSender} from "../utils/mailSender.js"

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 5*60 , // expires in 3 minute        
    }
})

export const OTP = mongoose.model("OTP",otpSchema)

async function sendVerificationEmail(email,otp){
    try {
        const emailRespose = mailSender(email,"Verification mail from StudyNotion",otp)
        console.log("OTP send Successfully to this email - ", email)
    } catch (error) {
        console.log("error while sending mail to these email - ", email)
        throw new Error(error)
    }
}

otpSchema.pre('save',async(next) => {
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp)
    }
    next()
})
