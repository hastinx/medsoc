const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.mail,
        pass: process.env.pass,
    },
});

exports.sendMail = async (mailDetails, callback) => {
    try {
        const info = await transporter.sendMail(mailDetails)
        callback(info);
    } catch (error) {
        console.log(error);
    }
};