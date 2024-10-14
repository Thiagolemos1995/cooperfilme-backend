import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { VoteEnum } from '../enums/vote.enum';

export class VoteDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsEnum(VoteEnum)
  @IsNotEmpty()
  vote: VoteEnum;
}
