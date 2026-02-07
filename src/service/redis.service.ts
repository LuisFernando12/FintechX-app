import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';
import { EnvService } from './env.service';

@Injectable()
export class RedisService
  extends Redis
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(RedisService.name);
  constructor(private readonly envService: EnvService) {
    super({
      host: envService.RedisHost,
      port: envService.RedisPort,
      password: envService.RedisPassword,
    });
  }
  async onModuleInit() {
    try {
      await this.ping();
      this.logger.log('Redis connected');
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error connecting to Redis');
    }
  }
  async onModuleDestroy() {
    await this.quit();
    this.logger.warn('Redis disconnect');
  }
}
