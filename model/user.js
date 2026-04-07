import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        accountType: {
            type: String,
            enum: ['Admin', 'User'],
            reuired: true
        },
        active: {
            type: Boolean,
            default: true,
        },
        approved: {
            type: Boolean,
            default: true,
        },
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
            required: true
        },
        image: {
            type: String,
            required: true
        },
        token: {
            type: String
        },
        resetPasswordTokenExpires: {
            type: Date
        },
    },// Add timestamps for when the document is created and last modified
    { timestamps: true }
);

export default mongoose.model('User', userSchema);