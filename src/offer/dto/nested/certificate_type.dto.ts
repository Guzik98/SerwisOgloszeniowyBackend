import { IsString, MaxLength, MinLength } from "class-validator";

export class CertificateTypeDto {
  @IsString()
  name: string;
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  description: string
}