import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'path';
export interface SchemaInfo {
  table: string;
  schema: string;
  documentation: string;
}
@Injectable()
export class SchemaService {
  private readonly schemaDIR: string;
  private readonly documentationDIR: string;
  constructor() {
    this.schemaDIR = './src/db/schema';
    this.documentationDIR = './src/knowledge';
  }
  async loadSchema(schema: string): Promise<SchemaInfo> {
    const schemaPath = join(this.schemaDIR, `${schema}.sql`);
    const documentationPath = join(this.documentationDIR, `${schema}.md`);
    let schemaContent: string;
    try {
      schemaContent = await readFile(schemaPath, 'utf-8');
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException(
        `Error loading schema${schema}: ${error}`,
      );
    }
    let documentationContent: string;
    try {
      documentationContent = await readFile(documentationPath, 'utf-8');
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException(
        `Error loading documentation ${schema}: ${error}`,
      );
    }
    return {
      table: schema,
      schema: schemaContent,
      documentation: documentationContent,
    };
  }
  async loadAllSchemas(): Promise<SchemaInfo[]> {
    let schemaFiles: string[] = [];
    try {
      schemaFiles = await readdir(this.schemaDIR);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Error loading schematics: ${error}`,
      );
    }
    schemaFiles.splice(schemaFiles.indexOf('index.sql'), 1);
    const schemaInfos: SchemaInfo[] = [];
    for (const schema of schemaFiles) {
      schemaInfos.push(await this.loadSchema(schema.replace('.sql', '')));
    }
    return schemaInfos;
  }
  async buildContextForPrompt(tables: string[]): Promise<string> {
    if (tables.length === 0) {
      throw new InternalServerErrorException('No tables provided');
    }
    const schemas: SchemaInfo[] = [];
    for (const table of tables) {
      schemas.push(await this.loadSchema(table));
    }
    console.log('Start create context for prompt');
    let context = '#Database Schema and Documentation Context:\n\n';
    for (const schemaInfo of schemas) {
      context += `##Table: ${schemaInfo.table}\n\n`;
      if (schemaInfo.documentation) {
        console.log(`Add documentation of ${schemaInfo.table}`);
        context += `###Documentation: ${schemaInfo.documentation}\n\n`;
      }
      if (schemaInfo.schema) {
        console.log(`Add schema of ${schemaInfo.table}`);
        context += `### Structure SQL\n\`\`\`sql\n${schemaInfo.schema}\n\`\`\`\n\n: ${schemaInfo.schema}\n\n`;
      }
    }
    console.log(`Successfully created context for prompt`);
    return context;
  }
  async getSummaryOfSchemas(): Promise<string> {
    const schemas = await this.loadAllSchemas();
    if (schemas.length === 0) {
      throw new InternalServerErrorException('No schemas found');
    }
    const sumaries = schemas.map((schema) => {
      return `- **${schema.table}**: ${schema.documentation.substring(0, 700).trim()}${schema.documentation.length > 700 ? '...' : ''}`;
    });
    return sumaries.join('\n');
  }
}
