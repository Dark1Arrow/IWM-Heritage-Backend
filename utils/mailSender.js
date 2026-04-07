import nodemailer from "nodemailer"

const mailSender = async(email, title , body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port : 587,
            auth:{
                user: process.env.USER_MAIL,
                pass: process.env.PASS_HOST
            }
        })
        const info = await transporter.sendMail({
            from : '"Heritage Dhuarsen || Goutam khanna"<goutamkhanna910@gmail.com>',
            to : email,
            subject: title,
            html: body
        })
        return info
    } catch (error) {
        console.log("Error occur while sending email : ", error)
    }
}

export {mailSender}