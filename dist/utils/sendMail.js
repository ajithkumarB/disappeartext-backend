"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const sendMail = async (receiver, sub, htmlBody) => {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLEINT_SECRET = process.env.CLEINT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLEINT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_ID,
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const mailOptions = {
            from: 'Magic Url<process.env.MAIL_ID>',
            to: receiver,
            subject: sub,
            text: 'Confirmation Mail for Forgot Password',
            html: htmlBody
        };
        const result = await transport.sendMail(mailOptions);
        return result;
    }
    catch (error) {
        return error;
    }
};
exports.sendMail = sendMail;
//# sourceMappingURL=sendMail.js.map