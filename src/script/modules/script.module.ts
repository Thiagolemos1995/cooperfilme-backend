import { Module } from '@nestjs/common';
import { ScriptController } from '../controllers';
import { ScriptService } from '../services';
import { ScriptRepository } from '../repositories';
import {
  FindAllScriptsUseCase,
  FindScriptByIdUseCase,
  SendScriptUseCase,
} from '../usecases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Script, ScriptState } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Script, ScriptState])],
  controllers: [ScriptController],
  providers: [
    ScriptService,
    ScriptRepository,
    SendScriptUseCase,
    FindAllScriptsUseCase,
    FindScriptByIdUseCase,
  ],
})
export class ScriptModule {}
