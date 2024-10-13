import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ScriptService } from '../services';

@Controller('script')
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @HttpCode(HttpStatus.OK)
  @Post('add')
  async addScript(@Body() test: string) {
    return await this.scriptService.postTest(test);
  }
}
