import { Configuration, OpenAIApi } from 'openai';
import { config } from 'src/config';

export class OpenAiRepository {
  private _configuration: Configuration;
  private _openAiapi: OpenAIApi;
  constructor() {
    this._configuration = new Configuration({
      organization: config.openaiOrganization,
      apiKey: config.openAiKey,
    });
    this._openAiapi = new OpenAIApi(this._configuration);
  }

  
}
