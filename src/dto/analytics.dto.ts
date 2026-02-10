import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
  @ApiProperty()
  result: object;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  explanation: string;
}
