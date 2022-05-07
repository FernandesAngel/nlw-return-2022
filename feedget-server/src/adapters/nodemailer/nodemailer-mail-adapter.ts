import { MailAdapter, SendMailData } from './../mail-adapter';
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3149eb6bb32576",
      pass: "bd3a41df1cb2cf"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
                from: 'Equipe Feedget <oi@fidget.com>',
                to: 'Angel Fernandes <legnafernandes@gmail.com>',
                subject,
                html: body
            })
    }
}