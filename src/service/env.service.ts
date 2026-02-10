import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}
  get AIModel(): string {
    return this.configService.getOrThrow<string>('AI_MODEL');
  }
  get AIModelSQLGenerate(): string {
    return this.configService.getOrThrow<string>('AI_MODEL_SQL_GENERATE');
  }
  get AIModelEmbeddings(): string {
    return this.configService.getOrThrow<string>('AI_MODEL_EMBEDDINGS');
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
  get RedisHost(): string {
    return this.configService.getOrThrow<string>('REDIS_HOST');
  }
  get RedisPort(): number {
    return this.configService.getOrThrow<number>('REDIS_PORT');
  }
  get RedisPassword(): string {
    return this.configService.getOrThrow<string>('REDIS_PASSWORD');
  }

  get ChromaHost(): string {
    return this.configService.getOrThrow<string>('CHROMA_HOST');
  }
  get ChromaPort(): number {
    return this.configService.getOrThrow<number>('CHROMA_PORT');
  }
  get NodeEnv(): string {
    return this.configService.getOrThrow<string>('NODE_ENV');
  }
}
