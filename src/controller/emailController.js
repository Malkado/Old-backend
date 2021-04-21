const nodemailer = require('nodemailer');
const User = require('../models/AuthUser');
const response = require('../helper/response-helper');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT), 
    secure: false,// true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
module.exports = {
    async sendConfirmEmail(req, res) {
        const { userId } = req;
        try {
            const resultFindUserByEmail = await User.findById(userId);
            const { email } = resultFindUserByEmail;
            const mailOptions = {
                from: process.env.EMAIL_USER,
                replyTo: process.env.EMAIL_USER,
                to: email,
                subject: 'E-mail enviado usando Node!',
                text: 'Bem fácil, não? ;)'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    transporter.close();
                    console.log(error);
                } else {
                    console.log('Email enviado: ' + info.response);
                    return res.send(response.responseMensage([], 'E-mail enviado com sucesso!', 200));
                }
            });
        } catch (error) {
            console.error('Error: ', error);
        }



    }
}
