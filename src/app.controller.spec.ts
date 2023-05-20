import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAiRepository } from './infra/openai.api';

describe('AppController', () => {
  let appController: AppController;
  let appRepository: OpenAiRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, OpenAiRepository],
    }).compile();

    appController = app.get<AppController>(AppController);
    appRepository = app.get<OpenAiRepository>(OpenAiRepository);
  });

  describe('root', () => {
    it('should return an email body"', async () => {
      const [recipient, body] = [
        'lawer@lawer.com',
        'congrats your case has been won!',
      ];
      const mockresposnsebody = `
        From: flavionogueirabarros@gmail.com
        To: ${recipient}
        Subject: Atualização no seu caso
    
        ${body}
      `;
      jest
        .spyOn(appRepository, 'buildEmailSimplefied')
        .mockImplementation(() => Promise.resolve(body));
      expect(
        await appController.buildemail({
          body: body,
          lawFirm: 'Pearson Specter Litt',
          recipientName: 'Flavio',
          senderName: 'Felipe',
          recipient: recipient,
          subject: '',
        }),
      ).toEqual(mockresposnsebody);
    });
  });
});
