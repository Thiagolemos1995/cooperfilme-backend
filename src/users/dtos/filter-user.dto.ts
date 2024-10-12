import { IsOptional, IsString, IsEnum } from 'class-validator';
import { QueryParams } from './query-param.dto';
import { ERole } from '../enums';

export class FilterUserDto extends QueryParams {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEnum(ERole)
  role?: ERole;
}
