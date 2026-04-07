import mongoose from "mongoose";
import dotenv from "dotenv"


const connectDB = async() => {
    // mongoose.connect(process.env.DATABASE_URL, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected Successfully")
    } catch (error) {
        console.log(`Error : ${error}`)
        process.exit()
    }
};

export { connectDB }