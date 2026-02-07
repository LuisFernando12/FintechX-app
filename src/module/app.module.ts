import { Module } from '@nestjs/common';
import { AnalyticsModule } from './analytics.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [AnalyticsModule, DatabaseModule],
})
export class AppModule {}
