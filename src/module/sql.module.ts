import { Module } from '@nestjs/common';
import { AIService } from '../service/ai.service';
import { DatabaseService } from '../service/database.service';
import { SQLService } from '../service/sql.service';

@Module({
  providers: [SQLService, DatabaseService, AIService],
  exports: [SQLService],
})
export class SQLModule {}
