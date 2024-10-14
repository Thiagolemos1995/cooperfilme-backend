import { EScriptState } from '../enums';
import { IsEnum, IsEmail, IsString, IsDate } from 'class-validator';

export class ScriptStatusResponseDto {
  @IsEnum(EScriptState)
  status: EScriptState;

  @IsEmail()
  email: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsDate()
  createdAt: Date;

  @IsString()
  genre: string;

  constructor(data: Partial<ScriptStatusResponseDto>) {
    Object.assign(this, data);
  }
}
