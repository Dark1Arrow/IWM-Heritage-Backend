import fileUpload from 'express-fileupload';
import express from "express"
const app = express();

// packages
import cookieParser from 'cookie-parser';
import cors from "cors"
import dotenv from "dotenv"

// connection to DB and cloudinary
import {connectDB} from "./config/database.js"
import {cloudinaryConnect} from "./config/cloudindary.js"

// routes
import userRoutes from "./router/user.js"
import profileRouter from "./router/profile.js"
import HeritageRouter from './router/heritage.js';


// middleware 
app.use(express.json()); // to parse json body
app.use(cookieParser());
app.use(
    cors({
        // origin: 'http://localhost:5173', // frontend link
        origin: "*",
        credentials: true
    })
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp'
    })
)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});

// connections
dotenv.config()
connectDB();
cloudinaryConnect();

// mount route
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/heritage', HeritageRouter)


// Default Route
app.get('/', (req, res) => {
    // console.log('Your server is up and running..!');
    res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
})