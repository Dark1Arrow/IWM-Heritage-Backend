import  User  from "../model/user.js"
import  Profile from "../model/profile.js"
import { uploadImageToCloudinary, deleteResourceFromCloudinary } from "../utils/imageUploder.js"
import { populate } from "dotenv"

const updateProfile = async (req, res) => {
    try {
        const { gender = "", dateOfBirth = "", firstName, lastName } = req.body

        const userId = req.user.id

        const userDetails = await User.findById(userId)
        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)

        userDetails.firstName = firstName
        userDetails.lastName = lastName
        await userDetails.save()

        profileDetails.gender = gender
        profileDetails.dateOfBirth = dateOfBirth
        await profileDetails.save()

        const updatedUserDetails = await User.findById(userId)
            .populate({
                path: "additionalDetails"
            })

        res.status(200).json({
            success: true,
            updatedUserDetails,
            message: "User data updated successfully"
        })
    } catch (error) {
        console.log("Error occur while updating user : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating profile"
        })
    }
}

const deleteAccount = async (res, req) => {
    try {
        const userId = req.user.id

        const userDetails = await User.findById(userId)
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        await deleteResourceFromCloudinary(userDetails.image)

        await Profile.findByIdAndDelete(userDetails.additionalDetails)
        await User.findByIdAndDelete(userId)

        res.status(200).json({
            success: true,
            message: "Account delete successfully"
        })

    } catch (error) {
        console.log("Error occur while deleting profile : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while deleting profile"
        })
    }
}

const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id

        const userDetails = await User.findById(userId).populate("additionalDetails").exec()

        res.status(200).json({
            success: true,
            data: userDetails,
            message: "User data fetched successfully"
        })
    } catch (error) {
        console.log("Error occur while fetching user details : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while fetching user details"
        })
    }
}

const updateUserProfileImage = async (req, res) => {
    try {
        const profileImage = req.files?.profileImage
        const userId = req.user.id
        const image = await uploadImageToCloudinary(profileImage, process.env.FOLDER_NAME, 1000, 1000)
        // console.log("image",image)
        const updatedUserDetails = await User.findByIdAndUpdate(userId,
            { image: image.secure_url },
            { new: true },
        ).populate({
            path: "additionalDetails"
        })

        res.status(200).json({
            success: true,
            message: "Image successfully updated",
            data: updatedUserDetails
        })

    } catch (error) {
        console.log("Error while uploading image : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while uploading image"
        })
    }
}

const instructorDashboard = async(req,res) => {
    try {
        const courseDetails = await Course.find({instructor: req.user.id})

        const courseData = courseDetails.map((course) => {
            const totalStudentEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentEnrolled * course.price

            const courseDataWithState = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentEnrolled,
                totalAmountGenerated
            }
            return courseDataWithState
        })

        res.status(200).json({
            success: true,
            courses: courseData,
            message: "Instructor Dashboard Data Fetched Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error"})
    }
}

export { updateProfile, deleteAccount, getUserDetails, updateUserProfileImage, instructorDashboard }