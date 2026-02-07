import { EnvService } from '@/service/env.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import OpenAI from 'openai';

export interface IExecutePrompt {
  prompt: string;
  model: string;
  systemPrompt: string;
}

@Injectable()
export class AIService {
  private openAI: OpenAI;
  constructor(private readonly envService: EnvService) {
    this.openAI = new OpenAI({
      baseURL: this.envService.AIBaseURL,
      apiKey: this.envService.AIAPIKey,
    });
  }
  async executePrompt({
    prompt,
    model,
    systemPrompt,
  }: IExecutePrompt): Promise<string> {
    if (!model || !prompt || !systemPrompt) {
      throw new BadRequestException(
        'Missing required parameters for AI prompt execution',
      );
    }
    try {
      const response = await this.openAI.chat.completions.create({
        model: model,
        temperature: 0.3,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: prompt,
          },
        ],
      });
      if (!response.choices[0].message.content) {
        throw new InternalServerErrorException('AI response has no content');
      }
      console.log('Response AI OK ! ');
      return response.choices[0].message.content
        .replace('```json', '')
        .replace('```', '')
        .replace('```', '');
    } catch (error: any) {
      console.error('Error executing AI prompt:', error);
      throw new InternalServerErrorException('Error executing AI prompt');
    }
  }
}
