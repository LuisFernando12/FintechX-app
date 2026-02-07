import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async queryRun(sql: string): Promise<object> {
    try {
      return await this.dataSource.query(sql);
    } catch (error) {
      this.logger.error(`Error to run query SQL: \n\n error: ${error}`);
      this.logger.verbose(`SQL:\n\n ${sql}\n\n `);
      throw new InternalServerErrorException('Error executing database query');
    }
  }
}
