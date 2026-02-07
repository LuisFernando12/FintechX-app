import { AnalyticsService } from '@/service/analytics.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import {
  ProcessNaturalLanguageQueryDTO,
  ProcessNaturalLanguageQueryResponseDTO,
} from '../dto/analytics.dto';

@Controller('/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ProcessNaturalLanguageQueryDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProcessNaturalLanguageQueryResponseDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  async processNaturalLanguageQuery(
    @Body() body: ProcessNaturalLanguageQueryDTO,
  ): Promise<ProcessNaturalLanguageQueryResponseDTO> {
    return await this.analyticsService.analize(body.question);
  }
}
