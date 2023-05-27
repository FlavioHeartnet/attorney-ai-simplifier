import { Injectable } from '@nestjs/common';
import { OpenAiRepository } from './infra/openai.api';
import CreateEmailDto from './dto/create.email.dto';
import { Email } from './@core/email.entity';
import { config } from './config';
import EmailProvider from './infra/emailProvider/nodemailer.provider';

@Injectable()
export class AppService {
  constructor(private readonly adapterAi: OpenAiRepository) {}

  async buildEmailservice(createDto: CreateEmailDto): Promise<string> {
    const simpleMessage = await this.adapterAi.buildEmailSimplefied(
      createDto.body,
      createDto.recipientName,
      createDto.senderName,
      createDto.lawFirm,
    );

    const email = new Email({
      body: simpleMessage,
      recipient: createDto.recipient,
      sender: config.email,
      subject: 'Atualização no seu caso',
    });

    // const emailProvider = new EmailProvider({
    //   subject: email.details.subject,
    //   to: email.details.recipient,
    //   from: email.details.sender,
    //   text: email.details.body
    // }).sendMessage();

    return email.getFormattedEmail();
  }
}
