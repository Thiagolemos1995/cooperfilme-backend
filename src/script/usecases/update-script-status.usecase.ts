import { Injectable } from '@nestjs/common';
import { ScriptService } from '../services/script.service';
import { Script } from '../entities/script.entity';
import { EScriptState } from '../enums/script-state.enum';
import { UseCase } from 'src/common/interfaces';
import {
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UpdateScriptStatusUseCase
  implements UseCase<{ id: string; newStatus: EScriptState }, Script>
{
  constructor(private readonly scriptService: ScriptService) {}

  async execute(payload: {
    id: string;
    newStatus: EScriptState;
  }): Promise<Script> {
    const { id, newStatus } = payload;
    try {
      return await this.scriptService.updateScriptStatus(id, newStatus);
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
