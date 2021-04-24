const nodemailer = require('nodemailer');
const User = require('../models/PersonUser');
const response = require('../helper/response-helper');

const validationModel = require('../models/validationAccont');

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

            const code = await validationModel.find({
                id_user: userId,
                status: false
            });
            console.log(code);
            if (code.length > 0) {
                const validationCode = code.code;
                const status = 200;
                const message = 'Código Enviado novamente. Verifique a caixa de span.';
                 sendEmail(email, validationCode, message, status);
                // return res.json(awaitsendEmail(email, validationCode, message, status));
            } else {
                let sequenceCode = '';
                while (sequenceCode.length < 6) {
                    const numero = Math.floor(Math.random() * 9);
                    sequenceCode = sequenceCode.length == 0 ? String(numero) : sequenceCode + numero;
                }

                /**
                 * Types:
                 * 1- Confirmar email
                 * 2-Trocar senha
                 */
                const saveCode = await validationModel.create({
                    id_user: userId,
                    type: 1,
                    code: sequenceCode
                });
                console.log(saveCode);
                if (saveCode) {
                    const status = 200;
                    const message = 'Código enviado com sucesso';
                    return res.json(response.responseMensage([], message, status));
                } else {
                    const status = 403;
                    const message = 'Falha ao gerar o código.';
                    return res.json(response.responseMensage([], message, status));
                }
            }







        } catch (error) {
            console.error('Error: ', error);
        }



    }


}
function sendEmail(email, codigo, message, satus) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        // replyTo: process.env.EMAIL_USER,
        to: email,
        subject: 'Código de confirmação!',
        text: codigo
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            transporter.close();
            console.log(error);
            return
        } else {
            console.log('Email enviado: ' + info.response);
            return res.send(response.responseMensage([], message, satus));
        }
    });
}