import { IsOptional } from 'class-validator';

export abstract class QueryParams {
  @IsOptional()
  order?: 'ASC' | 'DESC';

  @IsOptional()
  skip? = 0;

  @IsOptional()
  take? = 25;
}
