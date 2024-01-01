const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    }
})

const baseEmailOptions = {
    from: {
        name: 'Datle Teams',
        address: process.env.USER
    },
}

module.exports = {transporter, baseEmailOptions}
