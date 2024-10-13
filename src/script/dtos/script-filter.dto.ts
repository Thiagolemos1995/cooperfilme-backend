import { QueryParams } from 'src/common/interfaces';
import { EScriptState } from '../enums';
import { IsDateString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class ScriptFilter extends QueryParams {
  @IsEnum(EScriptState)
  @IsOptional()
  status: EScriptState;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsDateString()
  @IsOptional()
  createdAt: Date;
}
