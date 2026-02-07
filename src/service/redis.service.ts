import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { EnvService } from './env.service';

@Injectable()
export class RedisService
  extends Redis
  implements OnModuleInit, OnModuleDestroy
{
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
      console.log('Redis connected');
    } catch (error) {
      console.log(error);
    }
  }
  async onModuleDestroy() {
    await this.quit();
    console.log('Redis disconnect');
  }
}
