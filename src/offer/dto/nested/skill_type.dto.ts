import { Max, Min } from "class-validator";

export class SkillTypeDto {
  name: string;
  @Min(1)
  @Max(5)
  level: number;
}


