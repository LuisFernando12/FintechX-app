import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
export class ProcessNaturalLanguageQueryDTO {
  @ApiProperty()
  @IsNotEmpty()
  question: string;
}
export class ProcessNaturalLanguageQueryResponseDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  sql: string;
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  relevantTables: string[];
  @IsNotEmpty()
  @ApiProperty()
  result: object;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  explanation: string;
}
