import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import CreateEmailDto from './dto/create.email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('email')
  async buildemail(createDto: CreateEmailDto): Promise<string> {
    return await this.appService.buildEmailservice(createDto);
  }
}
