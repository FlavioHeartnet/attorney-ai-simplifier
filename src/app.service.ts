import { Injectable } from '@nestjs/common';
import { OpenAiRepository } from './infra/openai.api';
import CreateEmailDto from './dto/create.email.dto';
import { Email } from './@core/email.entity';
import { config } from './config';
import {mov} from './mocks/mov.mock'

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

    return email.getFormattedEmail();
  }

  async getSuitMoviments(cnj: string){

      return await this.adapterAi.buildJsonFromMovimentContent(mov.items[4].conteudo, mov.items[4].data);
  }
}
