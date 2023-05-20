import { Configuration, OpenAIApi } from 'openai';
import Email from './../@core/email.entity';
import { config } from '../config';

export class OpenAiRepository {
  static host = [
    {
      name: 'chat/completions',
      url: 'https://api.openai.com/v1/chat/completions',
    },
  ];
  private _configuration: Configuration;
  private _openAiapi: OpenAIApi;
  constructor() {
    this._configuration = new Configuration({
      organization: config.openaiOrganization,
      apiKey: config.openAiKey,
    });
    this._openAiapi = new OpenAIApi(this._configuration);
  }

  async buildEmailSimplefied(emailBody: Email) {}
}
