import { Injectable } from '@nestjs/common';
import { ScriptService } from '../services/script.service';
import { Script } from '../entities/script.entity';
import {
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import { VoteDto } from '../dtos';

@Injectable()
export class VoteScriptUseCase {
  constructor(private readonly scriptService: ScriptService) {}

  async executeVote(payload: VoteDto): Promise<Script> {
    try {
      return await this.scriptService.voteOnScript(payload);
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
