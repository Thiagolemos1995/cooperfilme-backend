import { Module } from '@nestjs/common';
import { ScriptController } from '../controllers';
import { ScriptService } from '../services';

@Module({
  controllers: [ScriptController],
  providers: [ScriptService],
})
export class ScriptModule {}
