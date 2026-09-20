import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import OpenAI from 'openai';

@Module({
  imports: [ConfigModule],
  controllers: [OpenaiController],
  providers: [
    OpenaiService,
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) =>
        new OpenAI({ apiKey: configService.getOrThrow('OPEN_AI_API_KEY') }),
      inject: [ConfigService],
    },
  ],
})
export class OpenaiModule {}
