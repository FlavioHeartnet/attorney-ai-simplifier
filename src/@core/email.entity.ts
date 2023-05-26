export interface IEmailDetails {
  recipient: string;
  subject: string;
  body: string;
  sender: string;
}

export class Email {
  private _details: IEmailDetails;

  constructor(details: IEmailDetails) {
    this._details = details;
  }
  get details() {
    return this._details;
  }
  getFormattedEmail(): string {
    const { sender, recipient, subject, body } = this._details;

    return `
        From: ${sender}
        To: ${recipient}
        Subject: ${subject}
    
        ${body}
      `;
  }
}
