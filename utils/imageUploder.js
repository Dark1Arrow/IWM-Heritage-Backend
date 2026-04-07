import { v2 as cloudinary } from 'cloudinary'

const uploadImageToCloudinary = async (file, folder, height, quality) => {
    try {
        const options = {folder}
        if(height) options.height = height
        if(quality) options.quality = quality
        console.log(file)
        options.resource_type = "auto"
        // console.log("Cloudinary Config Check:", cloudinary.config().cloud_name);
        return await cloudinary.uploader.upload(file.tempFilePath,options)
    } catch (error) {
        console.log("Error while uploading image on cloudinary")
        console.log(error)
    }
}

const deleteResourceFromCloudinary = async (url) => {
    try {
        if(!url) return
        
        const result = await cloudinary.uploader.destroy(url)
        console.log("Deleted resourde with public ID : ",url )
        console.log("Delete Resource result: ",result)
        return result
    } catch (error) {
        console.log(`Error while Deleting resource Id : ${url}`,error)
        throw new error
    }
}

export {uploadImageToCloudinary,deleteResourceFromCloudinary}