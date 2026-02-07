import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from '../service/database.service';
import { EnvService } from '../service/env.service';
import { EnvModule } from './env.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envSerice: EnvService) => ({
        type: 'mysql',
        host: envSerice.DBHost,
        port: envSerice.DBPort,
        username: envSerice.DBUser,
        password: envSerice.DBPassword,
        database: envSerice.DBName,
      }),
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
