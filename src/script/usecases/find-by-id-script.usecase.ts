import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Script } from '../entities';
import { ScriptService } from '../services/script.service';
import { UseCase } from 'src/common/interfaces';

@Injectable()
export class FindScriptByIdUseCase implements UseCase<string, Script> {
  constructor(private readonly scriptService: ScriptService) {}

  async execute(id: string): Promise<Script> {
    try {
      return await this.scriptService.findById(id);
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
