import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class ProjectTypeDto {
  @IsNotEmpty()
  project_name: string
  @MinLength(10)
  @MaxLength(140)
  description: string
}