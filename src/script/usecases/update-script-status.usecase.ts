import { Injectable } from '@nestjs/common';
import { ScriptService } from '../services/script.service';
import { Script } from '../entities/script.entity';
import { EScriptState } from '../enums/script-state.enum';
import { UseCase } from 'src/common/interfaces';

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
    return await this.scriptService.updateScriptStatus(id, newStatus);
  }
}
