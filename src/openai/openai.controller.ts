import { Controller, Post } from '@nestjs/common';

@Controller('openai')
export class OpenaiController {
  @Post('chatCompletion')
  async createChatCompletion() {}
}
