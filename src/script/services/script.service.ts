import { Injectable } from '@nestjs/common';
import { CreateScriptDto, ScriptFilter } from '../dtos';
import { Script } from '../entities';
import { ScriptRepository } from '../repositories';
import { Logger } from '@nestjs/common';
import { EScriptState } from '../enums';

@Injectable()
export class ScriptService {
  private readonly logger: Logger = new Logger(ScriptService.name);
  constructor(private readonly scriptRepository: ScriptRepository) {}

  async sendScript(payload: CreateScriptDto): Promise<Script> {
    this.logger.log('Sending script to analysis');
    return await this.scriptRepository.create(payload);
  }

  async findAll(params: ScriptFilter): Promise<[Script[], number]> {
    this.logger.log('Fetching scripts');
    return await this.scriptRepository.findAll(params);
  }

  async findById(id: string): Promise<Script> {
    this.logger.log(`Searching for a script with id: ${id}`);
    return await this.scriptRepository.findById(id);
  }

  async updateScriptStatus(
    id: string,
    newStatus: EScriptState,
  ): Promise<Script> {
    this.logger.log(`Updating status of script with id: ${id} to ${newStatus}`);
    return await this.scriptRepository.updateScriptStatus(id, newStatus);
  }
}
