const nodemailer = require('nodemailer');
const User = require('../models/AuthUser');
const response = require('../helper/response-helper');

const validationModel = require('../models/validationAccont');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
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
            if (code.length > 0) {
                const validationCode = code.code;
                const status = 200;
                const message = 'Código Enviado novamente. Verifique a caixa de span.';
                sendEmail(email, validationCode, message, status, res);
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
                if (saveCode) {
                    const status = 200;
                    const message = 'Código Enviado com sucesso.';
                    console.log(sendEmail(email, saveCode.code, message, status,res));
                     sendEmail(email, saveCode.code, message, status, res);
                } else {
                    const status = 403;
                    const message = 'Falha ao gerar o código.';
                    return res.json(response.responseMensage([], message, status));
                }
            }
        } catch (error) {
            const status = 500;
            const message = 'Erro interno da função. ';
            return res.json(response.responseMensage([], message, status));
        }



    },

    async confirmEmail(req, res) {
        const { userId } = req;
        const { validationCode } = req.headers;
        try {

            const findCode = {
                id_user: userId,
                status: false
            };

            const findUserCode = validationModel.find(findCode);
            if (!findUserCode) {
                const status = 200;
                const message = 'Conta já foi validada.';
                return res.json(response.responseMensage([], message, status));
            } else {

                if (findUserCode.code !== validationCode) {

                    const status = 400;
                    const message = 'Código inválido';
                    return res.json(response.responseMensage([], message, status));

                } else {
                    try {
                        await validationModel.updateOne(findCode, { status: true });
                        const status = 200;
                        const message = 'Função executada com sucesso.';
                        return res.json(response.responseMensage([], message, status));

                    } catch (error) {
                        const status = 500;
                        const message = 'Erro ao validar o código ';
                        return res.json(response.responseMensage([], message, status));
                    }
                }
            }
        } catch (error) {
            const status = 500;
            const message = 'Erro interno da função. ';
            return res.json(response.responseMensage([], message, status));
        }
    }


}
function sendEmail(email, codigo, message, status,res) {
   
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Código de confirmação!',
        text: codigo
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            transporter.close();
            return res.json(response.responseMensage([],'Falha no envio do e-mail.', 500));
        } else {
            console.log('Email enviado: ' + info.response);
             return res.json(response.responseMensage([], message, status));
        }
    });
}