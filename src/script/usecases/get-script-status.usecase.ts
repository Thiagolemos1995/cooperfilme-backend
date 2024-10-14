import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ScriptService } from '../services/script.service';
import { UseCase } from 'src/common/interfaces';
import { ScriptStatusResponseDto } from '../dtos';

@Injectable()
export class GetScriptStatusUseCase
  implements UseCase<string, ScriptStatusResponseDto>
{
  constructor(private readonly scriptService: ScriptService) {}

  async execute(id: string): Promise<ScriptStatusResponseDto> {
    try {
      return await this.scriptService.getScriptStatusById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error);
      }

      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
