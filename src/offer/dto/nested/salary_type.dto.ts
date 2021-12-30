import { Max, Min } from "class-validator";

export class SalaryTypeDto {
  @Min(1000)
  @Max(100000)
  from: number
  @Min(1000)
  @Max(100000)
  to: number
  currency: string
}