import { EnvService } from '@/service/env.service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import OpenAI from 'openai';

export interface IExecutePrompt {
  prompt: string;
  model: string;
  systemPrompt?: string;
}
@Injectable()
export class AIService {
  private _openAI: OpenAI;
  private readonly logger = new Logger(AIService.name);
  constructor(private readonly envService: EnvService) {
    this._openAI = new OpenAI({
      baseURL: this.envService.AIBaseURL,
      apiKey: this.envService.AIAPIKey,
    });
  }

  get openAI(): OpenAI {
    return this._openAI;
  }
  async executePrompt({
    prompt,
    model,
    systemPrompt,
  }: IExecutePrompt): Promise<string> {
    if (!model || !prompt) {
      throw new InternalServerErrorException(
        'Missing required parameters for AI prompt execution',
      );
    }
    try {
      const response = await this._openAI.chat.completions.create({
        model: model,
        temperature: 0.3,
        messages: [
          { role: 'system', content: systemPrompt || '' },
          {
            role: 'user',
            content: prompt,
          },
        ],
      });
      if (!response.choices[0].message.content) {
        throw new InternalServerErrorException('AI response has no content');
      }
      Logger.verbose('Response AI OK ! ');
      return response.choices[0].message.content
        .replace('```json', '')
        .replace('```', '')
        .replace('```', '');
    } catch (error: any) {
      this.logger.error('Error executing AI prompt:', JSON.stringify(error));
      throw new InternalServerErrorException('Error executing AI prompt');
    }
  }
}
