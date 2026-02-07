import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { systemPrompt } from '../constants/systemPromp';
import { AIService } from './ai.service';
import { DatabaseService } from './database.service';
import { EnvService } from './env.service';
@Injectable()
export class SQLService {
  constructor(
    private readonly aiService: AIService,
    private readonly envService: EnvService,
    private readonly databaseService: DatabaseService,
  ) {}
  async generateSQL(context: string, prompt: string): Promise<string> {
    if (!context || !prompt) {
      throw new InternalServerErrorException(
        'Context and prompt are required to generate SQL',
      );
    }
    const editedPrompt = `
        Context:
        ${context}
        Question: ${prompt}
    `;
    const generatedSQL: string = await this.aiService.executePrompt({
      prompt: editedPrompt,
      model: this.envService.AIModelSQLGenerate || this.envService.AIModel,
      systemPrompt: systemPrompt.GENERATE_SQL(),
    });
    return generatedSQL;
  }
  validateSQL(sql: string): boolean {
    sql = sql.toUpperCase();
    const DRANGEROUS_WORDS = [
      'DROP',
      'DELETE',
      'TRUNCATE',
      'ALTER',
      'CREATE',
      'INSERT',
      'UPDATE',
      'REVOKE',
      'GRANT',
      'EXECUTE',
      'EXEC',
    ];
    for (const word of DRANGEROUS_WORDS) {
      if (!sql.startsWith('SELECT') && !sql.startsWith('WITH')) {
        console.log('SQL dont start with "WITH" or "SELECT"');
        return false;
      }
      if (sql.includes(word)) {
        console.log(`SQL contains dangerous word: ${word}`);
        return false;
      }
    }
    return true;
  }
  clearSQL(sql: string): string {
    const markdownRegex =
      /```|`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|^#{1,6}\s|\n-\s|\n>\s/m;
    if (markdownRegex.test(sql)) {
      sql = sql
        .replace(/```sql/gi, '')
        .replace(/```/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/__([^_]+)__/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^\s*-\s+/gm, '')
        .replace(/^\s*>\s+/gm, '');
    }
    if (sql.includes('sql')) {
      sql = sql.replace('sql', '');
    }
    return sql.trim();
  }
  async executeQuerySQL(sql: string): Promise<object> {
    try {
      const resultQueryRun = await this.databaseService.queryRun(sql);
      return resultQueryRun;
    } catch (error: any) {
      console.log(`Error executing SQL query:\n\n ${sql}\n\n `);
      console.log(`Error: ${error}`);
      throw new InternalServerErrorException('Error executing SQL query');
    }
  }
  async explainResultQuerySQL(
    prompt: string,
    sql: string,
    result: object,
  ): Promise<string> {
    try {
      const promptToExplain = `
          PROMPT:
          ${prompt}
          SQL:
          ${sql}
          Result:
           ${JSON.stringify(result)}

      `;
      const explanation = await this.aiService.executePrompt({
        prompt: promptToExplain,
        model: this.envService.AIModel,
        systemPrompt: systemPrompt.EXPLAIN_RESEULT_SQL(),
      });
      return explanation;
    } catch (error: any) {
      console.log(`Error on explaining: ${error}`);
      throw new InternalServerErrorException('Error explaining result query');
    }
  }
}
