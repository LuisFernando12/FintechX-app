import { IsNotEmpty, IsString } from 'class-validator';
export class ProcessNaturalLanguageQueryDTO {
  @IsString()
  @IsNotEmpty()
  question: string;
}
// export class ProcessNaturalLanguageQueryResponseDTO {
//   message: string;
// }
