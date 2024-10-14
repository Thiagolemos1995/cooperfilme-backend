import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import {
  FindAllScriptsUseCase,
  SendScriptUseCase,
  FindScriptByIdUseCase,
  UpdateScriptStatusUseCase,
} from '../usecases';
import { CreateScriptDto, ScriptFilter } from '../dtos';
import { EScriptState } from '../enums';

@Controller('script')
export class ScriptController {
  constructor(
    private readonly sendScriptUseCase: SendScriptUseCase,
    private readonly findAllScripts: FindAllScriptsUseCase,
    private readonly findScriptById: FindScriptByIdUseCase,
    private readonly updateScriptStatusUseCase: UpdateScriptStatusUseCase,
  ) {}

  @Get()
  async fetchScripts(@Param() params: ScriptFilter) {
    return await this.findAllScripts.execute(params);
  }

  @Get(':id')
  async fetchScriptById(@Param('id') id: string) {
    return await this.findScriptById.execute(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('send')
  async addScript(@Body() payload: CreateScriptDto) {
    return await this.sendScriptUseCase.execute(payload);
  }

  @Patch(':id/status')
  async updateScriptStatus(
    @Param('id') id: string,
    @Body('status') newStatus: EScriptState,
  ) {
    return await this.updateScriptStatusUseCase.execute({ id, newStatus });
  }
}
