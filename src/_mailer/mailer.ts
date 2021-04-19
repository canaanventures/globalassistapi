import * as nodemailer from "nodemailer";

class EmailController {
    static sendEmail = async (mailOptions) => {
        return new Promise((resolve, reject) => {
            nodemailer.createTestAccount(() => {
                let transporter;
                transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    // host: "smtp.office365.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: "jobs.leadersimpact@gmail.com",
                        pass: "Mar@2021"
                    },
                    tls: {
                        ciphers: 'SSLv3'
                    }
                });

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(info);
                    }
                });
            })
        })
    }
}

export default EmailController;