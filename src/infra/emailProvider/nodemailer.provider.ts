import {createTransport, Transporter} from 'nodemailer';
import { config } from './../../config';
export interface IMessage {
  from: string;
  to: string;
  subject: string;
  text: string;
}
export default class EmailProvider {
  private _transporter: Transporter;
  private _message: IMessage;
  constructor(message: IMessage) {
    this._message = message;
    this._transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: config.email,
        pass: config.password,
      },
      tls: {
        ciphers:'SSLv3'
      }
    });
  }

  async sendMessage() {
    console.log(this._transporter.transporter.mailer)
    await this._transporter.sendMail(this._message);
  }
}
