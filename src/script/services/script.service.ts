import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateScriptDto,
  ScriptFilter,
  ScriptStatusResponseDto,
  VoteDto,
} from '../dtos';
import { Script } from '../entities';
import { ScriptRepository } from '../repositories';
import { Logger } from '@nestjs/common';
import { EScriptState } from '../enums';

@Injectable()
export class ScriptService {
  private readonly logger: Logger = new Logger(ScriptService.name);
  constructor(private readonly scriptRepository: ScriptRepository) {}

  async sendScript(payload: CreateScriptDto): Promise<Script> {
    this.logger.debug('Sending script to analysis');
    return await this.scriptRepository.create(payload);
  }

  async findAll(params: ScriptFilter): Promise<[Script[], number]> {
    this.logger.debug('Fetching scripts');
    return await this.scriptRepository.findAll(params);
  }

  async getScriptStatusById(id: string): Promise<ScriptStatusResponseDto> {
    this.logger.debug(`Fetching status for script with id: ${id}`);

    const script = await this.scriptRepository.findScriptStatusById(id);

    this.logger.log(`script found: ${JSON.stringify(script)}`);

    return script;
  }

  async findById(id: string): Promise<Script> {
    this.logger.debug(`Searching for a script with id: ${id}`);
    const script = await this.scriptRepository.findById(id);

    this.logger.log(`script found: ${JSON.stringify(script)}`);

    return script;
  }

  async updateScriptStatus(
    id: string,
    newStatus: EScriptState,
    message?: string,
  ): Promise<Script> {
    this.logger.debug(
      `Updating status of script with id: ${id} to ${newStatus}`,
    );
    const scriptStatus = await this.scriptRepository.findScriptStatusById(id);
    if (!scriptStatus) {
      throw new NotFoundException('Script not found');
    }

    if (scriptStatus.status === EScriptState.REJECTED) {
      throw new BadRequestException('Script already rejected');
    }

    const validTransitions = {
      [EScriptState.AWAITING_ANALYSIS]: [EScriptState.IN_ANALYSIS],
      [EScriptState.IN_ANALYSIS]: [
        EScriptState.AWAITING_REVIEW,
        EScriptState.REJECTED,
      ],
      [EScriptState.AWAITING_REVIEW]: [EScriptState.IN_REVIEW],
      [EScriptState.IN_REVIEW]: [EScriptState.AWAITING_APPROVAL],
      [EScriptState.AWAITING_APPROVAL]: [
        EScriptState.APPROVED,
        EScriptState.REJECTED,
      ],
    };

    const allowedStatuses = validTransitions[scriptStatus.status] || [
      EScriptState.ERROR,
    ];
    if (!allowedStatuses.includes(newStatus)) {
      this.logger.error(
        `Invalid status transition from ${scriptStatus.status} to ${newStatus}`,
      );
      throw new BadRequestException(
        `Script that is in ${scriptStatus.status} cannot be updated to ${newStatus}`,
      );
    }

    const script = await this.scriptRepository.updateScriptStatus(
      id,
      newStatus,
      message,
    );

    this.logger.log(`Script status updated to ${newStatus}`);

    return script;
  }

  async voteOnScript(payload: VoteDto): Promise<Script> {
    this.logger.log(
      `Voting on script with id: ${payload.id}, vote: ${payload.vote}`,
    );
    return await this.scriptRepository.voteOnScript(payload);
  }
}
