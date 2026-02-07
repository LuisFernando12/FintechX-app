import { AnalyticsController } from '@/controller/analytics.controller';
import { AIService } from '@/service/ai.service';
import { AnalyticsService } from '@/service/analytics.service';
import { SchemaService } from '@/service/schema-loader.service';
import { Module } from '@nestjs/common';
import { SQLModule } from './sql.module';

@Module({
  imports: [SQLModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AIService, SchemaService],
})
export class AnalyticsModule {}
