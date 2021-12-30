import { ArrayMinSize, IsArray, IsDefined, IsEmail, IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { MarkerIcon } from "../enums/MarkerIcon";
import { ExperienceLevel } from "../enums/experience_level.enum";
import { Prop } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { EducationTypeDto } from "./nested/education_type.dto";
import { CertificateTypeDto } from "./nested/certificate_type.dto";
import { ExperienceTypeDto } from "./nested/experience_type.dto";
import { ProjectTypeDto } from "./nested/project_type.dto";
import { EmploymentTypeDto } from "./nested/employment_type.dto";
import { SkillTypeDto } from "./nested/skill_type.dto";

export class CreateOfferDto {
  @IsNotEmpty()
  name;

  @IsNotEmpty()
  surname;

  @IsNotEmpty()
  short_personal_description: string

  photo_url: string

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  address_text: string;

  @IsEnum(MarkerIcon)
  @IsNotEmpty()
  marker_icon: string;

  @IsNotEmpty()
  @IsEmail()
  email: string

  github_url: string
  Linkedln_url: string
  phone_number: string

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(0)
  @Type(() => EducationTypeDto)
  education: EducationTypeDto[]

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(0)
  @Type(() => CertificateTypeDto)
  certificate: CertificateTypeDto[]

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(0)
  @Type(() => ExperienceTypeDto)
  experience: ExperienceTypeDto[]

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(0)
  @Type(() => ProjectTypeDto)
  project: ProjectTypeDto[]

  @IsNotEmpty()
  english_level: string;

  @IsEnum(ExperienceLevel)
  experience_level: string

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;

  @IsNotEmpty()
  published_at: string;

  @Prop()
  country_code: string

  @Prop()
  id: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => EmploymentTypeDto)
  @ValidateNested({ each: true })
  employment_types : EmploymentTypeDto[]

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => SkillTypeDto)
  skills: SkillTypeDto[]
}


