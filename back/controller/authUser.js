const { passwordValidation, emailValidation } = require('../helper/validation.js');
const db = require('../config/db.js');
const dbPromise = db.promise()
const bcrypt = require('bcrypt');
const { generateToken } = require('../helper/generate.js');
const { template } = require('../helper/email/template.js');
const { templateReset } = require('../helper/email/templateReset.js');
const { sendMail } = require('../helper/email/mail.js');

module.exports = {
    register: async (req, res) => {

        let { username, email, password, confirm_password } = req.body
        console.log('Body', req.body)
        let errMessage = []

        if (username === "") {
            errMessage.push("Username shouldn't empty")
        }

        let [existUsername] = await dbPromise.query(`SELECT * FROM tb_auth WHERE username='${username}'`)
        if (existUsername.length > 0) {
            errMessage.push("Username already exist")
        }



        if (email === "") {
            errMessage.push("Email shouldn't empty")
        } else {
            let validEmail = emailValidation(email)
            if (validEmail.status === false) {
                if (validEmail.message.length > 0) {
                    for (let i of validEmail.message) {
                        errMessage.push(i)
                    }
                }
            }
        }
        let [existEmail] = await dbPromise.query(`SELECT * FROM tb_auth WHERE email='${email}'`)
        if (existEmail.length > 0) {
            errMessage.push("Email already exist")
        }

        let validPassword = passwordValidation(password)

        if (validPassword.status === false) {
            if (validPassword.message.length > 0) {
                for (let i of validPassword.message) {
                    errMessage.push(i)
                }
            }
        }
        if (password !== confirm_password) {
            errMessage.push("Confirm password mismatched")
        }



        if (errMessage.length > 0) {
            return res.status(400).json({ errMessage })
        }

        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)
        let token = generateToken()

        let [inserted] = await dbPromise.query(`INSERT INTO tb_auth (username,email,password,token) VALUES ('${username}','${email}','${hashPassword}','${token}')`)

        if (inserted) {
            const options = {
                from: "MedSoc <sender@gmail.com>", // sender address
                to: "hastinxv@gmail.com", // receiver email
                subject: "MedSoc - Verification Account", // Subject line
                html: template(token),
            }

            sendMail(options, (info) => {
                console.log("Email sent successfully");
                console.log("MESSAGE ID: ", info.messageId);
            });
            return res.status(200).json({ 'message': 'Register successfully', 'email': email, 'token': token })
        } else {
            return res.status(400).json({ 'message': 'Register failed' })
        }

    },

    login: async (req, res) => {
        const { account, password } = req.body

        let errMessage = []

        var [data] = await dbPromise.query(`SELECT aut.*,uct.id as id_content, uct.image as img_content , uct.caption FROM tb_auth aut JOIN tb_user_content uct ON aut.email = uct.email WHERE aut.username='${account}' OR aut.email='${account}'`)
        console.log(data)
        if (data.length === 0) {
            [data] = await dbPromise.query(`SELECT * FROM tb_auth WHERE username='${account}' OR email='${account}'`)
            if (data.length === 0) {
                errMessage.push('Account not found')
            } else {
                let validPassword = await bcrypt.compare(password, data[0].password)
                console.log('valid', validPassword)
                if (!validPassword) {
                    errMessage.push('Wrong Password')
                }
            }
        } else {
            let validPassword = await bcrypt.compare(password, data[0].password)
            console.log('valid', validPassword)
            if (!validPassword) {
                errMessage.push('Wrong Password')
            }
        }

        if (errMessage.length > 0) {
            return res.status(400).json({ errMessage })
        } else {
            res.status(200).json({
                data
            })
        }

    },

    verify: async (req, res) => {
        console.log(req.query.token)
        let [data] = await dbPromise.query(`SELECT * FROM tb_auth WHERE token='${req.query.token}'`)
        console.log(data)
        if (data.length > 0) {
            await dbPromise.query(`UPDATE tb_auth SET isverified=1 WHERE token='${req.query.token}'`)
            return res.status(200).json({ 'message': 'Verification successfully', 'isverified': 1 })
        } else {
            return res.status(400).json({ 'message': 'Verification failed, token is invalid' })
        }
    },

    resendVerification: async (req, res) => {

        let token = generateToken()
        console.log(req.query.email, token)

        let [update] = await dbPromise.query(`UPDATE tb_auth SET token='${token}',isverified = 0 WHERE email='${req.query.email}'`)
        console.log(update)
        let [data] = await dbPromise.query(`SELECT * FROM tb_auth WHERE token='${token}'`)
        console.log(data)
        if (data.length > 0) {
            const options = {
                from: "MedSoc-Resend <sender@gmail.com>", // sender address
                to: "hastinxv@gmail.com", // receiver email
                subject: "MedSoc - Resend Verification Account", // Subject line
                html: template(token),
            }

            sendMail(options, (info) => {
                console.log("Email sent successfully");
                console.log("MESSAGE ID: ", info.messageId);
            });
            return res.status(200).json({ 'message': 'Resend successfully', 'token': data[0].token, 'email': data[0].email })
        } else {
            return res.status(400).json({ 'message': 'Resend failed' })
        }

    },
    sendResetPassword: async (req, res) => {
        let [email] = await dbPromise.query(`SELECT * FROM tb_auth WHERE email='${req.query.email}'`)
        let errMessage = []
        console.log(email)
        if (email.length === 0) {
            errMessage.push("Your account not found ")
        }
        if (errMessage.length > 0) {
            return res.status(400).json({ errMessage })
        }
        let token = generateToken()

        await dbPromise.query(`UPDATE tb_auth SET reset_token='${token}' WHERE email='${req.query.email}'`)

        let [data] = await dbPromise.query(`SELECT * FROM tb_auth WHERE reset_token='${token}'`)
        console.log(data)
        if (data.length > 0) {
            const options = {
                from: "MedSoc-Resend <sender@gmail.com>", // sender address
                to: "hastinxv@gmail.com", // receiver email
                subject: "MedSoc - Resend Reset Password", // Subject line
                html: templateReset(token),
            }

            sendMail(options, (info) => {
                console.log("Email sent successfully");
                console.log("MESSAGE ID: ", info.messageId);
            });
            return res.status(200).json({ 'message': 'Resend successfully', 'email': data[0].email })
        } else {
            return res.status(400).json({ 'message': 'Resend failed' })
        }
    },
    resetPassword: async (req, res) => {
        const { password } = req.body
        let validPassword = passwordValidation(password)
        let errMessage = []
        if (validPassword.status === false) {
            if (validPassword.message.length > 0) {
                for (let i of validPassword.message) {
                    errMessage.push(i)
                }
            }
        }
        if (errMessage.length > 0) {
            return res.status(400).json({ errMessage })
        }

        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)

        let [update] = await dbPromise.query(`UPDATE tb_auth SET password='${hashPassword}' WHERE reset_token='${req.query.token}'`)

        if (update) {
            return res.status(200).json({ 'message': 'Reset Password successfully' })
        } else {
            return res.status(400).json({ 'message': 'Reset Password failed, token is invalid' })
        }

    }

}