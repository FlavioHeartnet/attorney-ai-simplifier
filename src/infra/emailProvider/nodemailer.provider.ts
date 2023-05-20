import nodemailer from 'nodemailer';
import { config } from './../../config';
export interface IMessage {
  from: string;
  to: string;
  subject: string;
  text: string;
}
export default class EmailProvider {
  private _transporter;
  private _message: IMessage;
  constructor(message: IMessage) {
    this._message = message;
    this._transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: config.email,
        pass: config.password,
      },
    });
  }

  async sendMessage() {
    await this._transporter.sendEmail(this._message);
  }
}
