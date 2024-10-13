import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateScriptDto } from '../dtos';
import { Script } from '../entities';
import { ScriptService } from '../services/script.service';
import { UseCase } from 'src/common/interfaces';

@Injectable()
export class SendScriptUseCase implements UseCase<CreateScriptDto, Script> {
  constructor(private readonly scriptService: ScriptService) {}

  async execute(payload: CreateScriptDto): Promise<Script> {
    try {
      return await this.scriptService.sendScript(payload);
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
