import {
  Configuration,
  OpenAIApi,
  CreateChatCompletionRequest,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import { config } from '../config';
import { AgentClient } from './../agent.client';

export class OpenAiRepository {
  static MODEL = 'gpt-3.5-turbo';
  private _configuration: Configuration;
  private _openAiapi: OpenAIApi;
  private _agent: AgentClient;
  constructor(agent: AgentClient = { language: 'Portuguese' }) {
    this._agent = agent;
    this._configuration = new Configuration({
      organization: config.openaiOrganization,
      apiKey: config.openAiKey,
    });
    this._openAiapi = new OpenAIApi(this._configuration);
  }
  async buildJsonFromMovimentContent(content: string, movDate: string){
      const request: CreateChatCompletionRequest = {
        model: OpenAiRepository.MODEL,
        messages: [
          {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content:
              'You will respond with a json with the following attributes if its a "intimiação": data, prazo_ate, tipo and if this is a "notificação de audiencia" then show those: data_evento, hora_evento',
          },
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: `reescreva em formato json de forma utilizavel em uma sistema as principais informações desta movimentação juridica feita na data de ${movDate} colocando o prazo a data de ate quando deve ser cumprido a movimentação se houver algum prazo: ${content}`
          }
        ]
      }
      const response = (await this._openAiapi.createChatCompletion(request)).data;
      console.log(response.usage);
      return response.choices[0].message.content;
  }
  async buildEmailSimplefied(
    prompt: string,
    client: string,
    lawer: string,
    lawFirmName: string,
  ) {
    const request: CreateChatCompletionRequest = {
      model: OpenAiRepository.MODEL,
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content:
            'you will be a copywriter to respond to clients of a law firm about the status of their cases',
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content:
            "You will receive the legal text related to the client's case and rewrite the text in a simple way that non-lawyer clients can understand.",
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: `gere um email para o cliente ${client} sobre o seguinte texto juridico enviado ${lawer} do escritorio ${lawFirmName}: ${prompt} Please write in ${this._agent.language} language`,
        },
      ],
    };
    const response = (await this._openAiapi.createChatCompletion(request)).data;
    console.log(response.usage);
    return response.choices[0].message.content;
  }
}
