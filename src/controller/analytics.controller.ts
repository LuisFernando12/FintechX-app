import { AnalyticsService } from '@/service/analytics.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ProcessNaturalLanguageQueryDTO } from '../dto/analytics.dto';

@Controller('/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}
  @Post()
  processNaturalLanguageQuery(@Body() body: ProcessNaturalLanguageQueryDTO) {
    return this.analyticsService.analize(body.question);
  }
}
