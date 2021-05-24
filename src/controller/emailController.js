const nodemailer = require('nodemailer');
const User = require('../models/AuthUser');
const response = require('../helper/response-helper');
const Person = require('../models/Register/PersonUser');
const Association = require('../models/Register/AssociationUser');


const crypto = require('crypto');

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

var type = {
    password: 'password',
    email: 'email'
};


module.exports = {
    async sendConfirmEmail(req, res) {
        const { userId } = req;
        let firstName;
        try {
            const resultFindUserByEmail = await User.findById(userId);
            const { email, type_user, id_user } = resultFindUserByEmail;

            const user = type_user === 0 ? await Person.find({ sequence_id: id_user }) : await Association.find({ sequence_id: id_user });
            firstName = type_user === 0 ? user[0].firstName : user[0].fantasy_name;
            const code = await validationModel.find({
                id_user: userId,
                status: false
            });
            if (code.length > 0) {
                const validationCode = code.code;
                const status = 200;
                const message = 'Código Enviado novamente. Verifique a caixa de span.';
                sendEmail(email, validationCode, message, status, res, type.email);
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
                    sendEmail(email, saveCode.code, message, status, res, type.email);
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
    },
    //Forgot Password
    async forgotPassword(req, res) {
        const { userId } = req;
        let firstName;
        try {
            const resultFindUserByEmail = await User.findById(userId);
            const { email, type_user, id_user } = resultFindUserByEmail;
            const user = type_user === 0 ? await Person.find({ sequence_id: id_user }) : await Association.find({ sequence_id: id_user });
            firstName = type_user === 0 ? user[0].firstName : user[0].fantasy_name;

            const code = await validationModel.find({
                id_user: userId,
                status: false
            });
            if (code.length > 0) {
                const validationCode = code[0].code;
                const status = 200;
                const message = 'Código Enviado novamente. Verifique a caixa de span.';
                sendEmail(email, validationCode, message, status, res, firstName, type.password);
            } else {
                let sequenceCode = '';
                while (sequenceCode.length < 6) {
                    const numero = Math.floor(Math.random() * 9);
                    sequenceCode = sequenceCode.length == 0 ? String(numero) : sequenceCode + numero;
                }
                const encrypt_code = await crypto.createHash('md5').update(sequenceCode).digest("hex");;

                /**
                 * Types:
                 * 1- Confirmar email
                 * 2-Trocar senha
                 */
                const saveCode = await validationModel.create({
                    id_user: userId,
                    type: 2,
                    code: sequenceCode
                });
                if (saveCode) {
                    const status = 200;
                    const message = 'Código Enviado com sucesso.';
                    sendEmail(email, saveCode.code, message, status, res, firstName, type.password);
                } else {
                    const status = 403;
                    const message = 'Falha ao gerar o código.';
                    return res.json(response.responseMensage([], message, status));
                }
            }
        } catch (error) {
            console.error(error)
            const status = 500;
            const message = 'Erro interno da função. ';
            return res.json(response.responseMensage([], message, status));
        }
    },

    /**
     * Confirmar o código
     */
    async confirmPassword(req, res) {
        const { userId } = req;
        const { password, code } = req.headers;
        try {

            const findCode = {
                id_user: userId,
                status: false
            };

            const findUserCode = await validationModel.find(findCode);
            if (!findUserCode || findUserCode.length === 0) {
                const status = 200;
                const message = 'Conta já foi validada.';
                return res.json(response.responseMensage([], message, status));
            } else {
                if (code !== findUserCode[0].code) {
                    const status = 400;
                    const message = 'Código inválido';
                    return res.json(response.responseMensage([], message, status));

                } else {
                    try {
                        const updatingCode = await validationModel.updateOne({ "id_user": userId }, { status: true });
                        if (!updatingCode) {
                            const status = 500;
                            const message = 'Erro interno da função.';
                            return res.json(response.responseMensage([], message, status));
                        }

                        const updatingUser = await User.updateOne({ _id: userId }, { password: password });

                        if (!updatingUser) {
                            const status = 500;
                            const message = 'Erro ao tentar alterar senha.';
                            return res.json(response.responseMensage([], message, status));
                        }
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
function sendEmail(email, codigo, message, status, res, name, tipo) {
    const text = tipo == type.password ? 'Sua nova senha temporária para acessar o aplicativo' : 'É um prazer te receber no nosso aplicativo, insira o código abaixo para confirmar o seu email'
    const imagem = 'https://firebasestorage.googleapis.com/v0/b/elderlycare-7fea8.appspot.com/o/care_logo.png?alt=media&token=1608cd3f-9dcb-4926-bc1a-f29673e60d3d'
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Código de confirmação!',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
           <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Email de confirmação de email - Elderlycare</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
           </head>
           <body style="margin: 0; padding: 0;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="margin-top: 30px;border: 1px solid #cccccc;">
                 <tr>
                    <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0;" >
                       <img src="${imagem}" alt="Criando Mágica de E-mail" width="150" height="100" style="display: block;" />
                    </td>
                 </tr>
                 <tr>
                    <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                       <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                             <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;text-align: center">
                                <b>CÓDIGO DE ACESSO</b>
                             </td>
                          </tr>
                          <tr>
                             <td style="padding: 20px 0 10px 0;" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;"
                                >
                                <p>Olá, ${name}</p>
                                <p style="margin:0 auto">${text}:</p>
                             <p style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;text-align: center">${codigo}</p>
                             </td>
                          </tr>
                       </table>
                    </td>
                 </tr>
                 <tr>
                    <td bgcolor="#70bbd9" style="padding: 30px 30px 30px 30px;text-align: center;">
                       <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                             <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
                                &reg;  All Rights Reserved
                             </td>
                          </tr>
                       </table>
                    </td>
                 </tr>
              </table>
           </body>
        </html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            transporter.close();
            return res.json(response.responseMensage([], 'Falha no envio do e-mail.', 500));
        } else {
            console.log('Email enviado: ' + info.response);
            return res.json(response.responseMensage([], message, status));
        }
    });
}
