import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import CreateEmailDto from './dto/create.email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('email')
  buildemail(createDto: CreateEmailDto): string {
    return this.appService.buildEmailservice(createDto);
  }
}
