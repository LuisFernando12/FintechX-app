import { AIService } from '@/service/ai.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { systemPrompt } from '../constants/systemPromp';
import { ProcessNaturalLanguageQueryResponseDTO } from '../dto/analytics.dto';
import { EnvService } from './env.service';
import { SchemaService } from './schema-loader.service';
import { SQLService } from './sql.service';

export interface ISQLResult {
  sql: string;
  relevantTables: string[];
  result: object;
  explanation?: string;
}

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly aiService: AIService,
    private readonly envService: EnvService,
    private readonly schemaService: SchemaService,
    private readonly sqlService: SQLService,
  ) {}
  async analize(
    prompt: string,
  ): Promise<ProcessNaturalLanguageQueryResponseDTO> {
    const relevantTables = await this.relevantTables(prompt);
    const context = await this.schemaService.buildContextForPrompt(
      relevantTables.tables,
    );
    const sqlGenerated = await this.sqlService.generateSQL(context, prompt);
    const sql = this.sqlService.clearSQL(sqlGenerated);
    if (!this.sqlService.validateSQL(sql)) {
      throw new InternalServerErrorException('Invalid SQL generated');
    }
    const resultExecuteQuerySQL = await this.sqlService.executeQuerySQL(sql);
    const explanetedResult = await this.sqlService.explainResultQuerySQL(
      prompt,
      sql,
      resultExecuteQuerySQL,
    );
    return {
      sql: sqlGenerated,
      relevantTables: relevantTables.tables,
      result: resultExecuteQuerySQL,
      explanation: explanetedResult,
    };
  }
  async relevantTables(question: string): Promise<{ tables: string[] }> {
    const aiResponse: string = await this.aiService.executePrompt({
      prompt: question,
      model: this.envService.AIModel,
      systemPrompt: systemPrompt.RELEVANT_TABLES(
        await this.schemaService.getSummaryOfSchemas(),
      ),
    });
    return { tables: JSON.parse(aiResponse) as string[] };
  }
}
