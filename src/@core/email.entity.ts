export interface IEmailDetails {
  recipient: string;
  subject: string;
  body: string;
  sender: string;
}

export class Email {
  private details: IEmailDetails;

  constructor(details: IEmailDetails) {
    this.details = details;
  }

  getFormattedEmail(): string {
    const { sender, recipient, subject, body } = this.details;

    return `
        From: ${sender}
        To: ${recipient}
        Subject: ${subject}
    
        ${body}
      `;
  }
}
