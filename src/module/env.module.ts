import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as j from 'joi';
import { EnvService } from '../service/env.service';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: j.object({
        AI_MODEL: j.string().required(),
        AI_MODEL_SQL_GENERATE: j.string().default(''),
        AI_MODEL_EMBEDDINGS: j.string().required(),
        AI_BASE_URL: j.string().required(),
        AI_API_KEY: j.string().default(''),
        DB_HOST: j.string().required(),
        DB_PORT: j.number().required(),
        DB_USER: j.string().required(),
        DB_PASSWORD: j.string().required(),
        DB_NAME: j.string().required(),
        REDIS_HOST: j.string().required(),
        REDIS_PORT: j.number().required(),
        REDIS_PASSWORD: j.string().required(),
        CHROMA_HOST: j.string().required(),
        CHROMA_PORT: j.number().required(),
        NODE_ENV: j.string().required(),
      }),
    }),
  ],
  providers: [EnvService, ConfigService],
  exports: [EnvService],
})
export class EnvModule {}
