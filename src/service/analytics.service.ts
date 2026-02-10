import { AIService } from '@/service/ai.service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ProcessNaturalLanguageQueryResponseDTO } from '../dto/analytics.dto';
import { EmbeddingsService } from './embeddings.service';
import { EnvService } from './env.service';
import { RedisService } from './redis.service';
import { SchemaService } from './schema-loader.service';
import { SQLService } from './sql.service';

export interface ISQLResult {
  sql: string;
  result: object;
  explanation?: string;
}

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);
  constructor(
    private readonly aiService: AIService,
    private readonly envService: EnvService,
    private readonly schemaService: SchemaService,
    private readonly sqlService: SQLService,
    private readonly redisService: RedisService,
    private readonly embeddingsService: EmbeddingsService,
  ) {}
  async analize(
    prompt: string,
  ): Promise<ProcessNaturalLanguageQueryResponseDTO> {
    this.logger.verbose('Starting to process natural language to  SQL query');
    const hasCahed = await this.redisService.get(prompt);
    if (hasCahed) {
      this.logger.verbose('Returning from cache');
      return JSON.parse(hasCahed) as ProcessNaturalLanguageQueryResponseDTO;
    }
    this.logger.verbose(
      'Calling method compareEmbedings of the EmbedddingsService',
    );
    const comparedEmbidings =
      await this.embeddingsService.compareEmbeddings(prompt);
    this.logger.verbose('Generating context to generate sql');
    const context: string = comparedEmbidings
      .map((compared) => compared.pageContent)
      .join('\n\n');

    this.logger.verbose('Called generateSQL with context and prompt');

    const sqlGenerated = await this.sqlService.generateSQL(context, prompt);
    this.logger.verbose(
      'Cleaning any traces of characters that do not belong to SQL',
    );

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

    const analizeResponse = {
      sql: sqlGenerated,
      result: resultExecuteQuerySQL,
      explanation: explanetedResult,
    };
    await this.redisService.set(
      prompt,
      JSON.stringify(analizeResponse),
      'EX',
      60 * 15,
    );

    return analizeResponse;
  }
  // async relevantTables(question: string): Promise<{ tables: string[] }> {
  //   const result = await this.embeddingsService.embed();

  //   return { tables: ['orders', 'customers', `results: ${result}: `] };
  // }
}
// const comparedChunks =
//   await this.embeddingsService.compareEmbeddings(question);
