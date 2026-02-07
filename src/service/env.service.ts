import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}
  get AIModelSQLGenerate(): string {
    return this.configService.getOrThrow<string>('AI_MODEL_SQL_GENERATE');
  }
  get AIModel(): string {
    return this.configService.getOrThrow<string>('AI_MODEL');
  }
  get AIBaseURL(): string {
    return this.configService.getOrThrow<string>('AI_BASE_URL');
  }
  get AIAPIKey(): string {
    return this.configService.getOrThrow<string>('AI_API_KEY');
  }
  get DBHost(): string {
    return this.configService.getOrThrow<string>('DB_HOST');
  }
  get DBPort(): number {
    return this.configService.getOrThrow<number>('DB_PORT');
  }
  get DBUser(): string {
    return this.configService.getOrThrow<string>('DB_USER');
  }
  get DBPassword(): string {
    return this.configService.getOrThrow<string>('DB_PASSWORD');
  }
  get DBName(): string {
    return this.configService.getOrThrow<string>('DB_NAME');
  }
}
