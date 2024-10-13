import { ScriptFilter } from '../dtos';
import { ScriptRepository } from '../repositories';
import { Script } from '../entities';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class FindAllScriptsUseCase {
  constructor(private readonly scriptRepository: ScriptRepository) {}

  async execute(params: ScriptFilter): Promise<[Script[], number]> {
    try {
      return await this.scriptRepository.findAll(params);
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
