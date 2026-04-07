import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    gender: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
});


export default mongoose.model('Profile', profileSchema);