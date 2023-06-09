import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  openaiOrganization: process.env.ORGANIZATION,
  openAiKey: process.env.OPENAI_API_KEY,
  email: process.env.EMAIL,
  password: process.env.EMAIL_PASSWORD,
};
