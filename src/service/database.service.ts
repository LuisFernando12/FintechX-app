import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
@Injectable()
export class DatabaseService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async queryRun(sql: string): Promise<object> {
    try {
      return await this.dataSource.query(sql);
    } catch (error) {
      console.log(`Error to run query SQL: ${sql} \n\n error: ${error}`);
      throw new InternalServerErrorException('Error executing database query');
    }
  }
}
