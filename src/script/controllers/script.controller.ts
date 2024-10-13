import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { FindAllScriptsUseCase, SendScriptUseCase } from '../usecases';
import { CreateScriptDto, ScriptFilter } from '../dtos';

@Controller('script')
export class ScriptController {
  constructor(
    private readonly sendScriptUseCase: SendScriptUseCase,
    private readonly findAllScripts: FindAllScriptsUseCase,
  ) {}

  @Get()
  async fetchScripts(@Param() params: ScriptFilter) {
    return await this.findAllScripts.execute(params);
  }

  @HttpCode(HttpStatus.OK)
  @Post('send')
  async addScript(@Body() payload: CreateScriptDto) {
    return await this.sendScriptUseCase.execute(payload);
  }
}
