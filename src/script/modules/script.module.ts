import { Module } from '@nestjs/common';
import { ScriptController } from '../controllers';
import { ScriptService } from '../services';
import { ScriptRepository } from '../repositories';
import {
  FindAllScriptsUseCase,
  FindScriptByIdUseCase,
  SendScriptUseCase,
  UpdateScriptStatusUseCase,
  GetScriptStatusUseCase,
  VoteScriptUseCase,
} from '../usecases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Script, ScriptState } from '../entities';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Script, ScriptState])],
  controllers: [ScriptController],
  providers: [
    JwtService,
    ScriptService,
    ScriptRepository,
    SendScriptUseCase,
    FindAllScriptsUseCase,
    FindScriptByIdUseCase,
    UpdateScriptStatusUseCase,
    GetScriptStatusUseCase,
    VoteScriptUseCase,
  ],
})
export class ScriptModule {}
