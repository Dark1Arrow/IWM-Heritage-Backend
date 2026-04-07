import { v2 as cloudinary } from 'cloudinary'

const cloudinaryConnect = () => {
    console.log(process.env.CLOUD_NAME)
    try {
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME.trim(),
            api_key: process.env.API_KEY.trim(),
            api_secret: process.env.API_SECRET.trim()
        })
        console.log("Cloudinary connected successfully")
    } catch (error) {
        console.log(error)
    }
}

export {cloudinaryConnect}