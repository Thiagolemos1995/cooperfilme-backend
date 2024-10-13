import { Injectable } from '@nestjs/common';

@Injectable()
export class ScriptService {
  async postTest(test: string): Promise<string> {
    return test;
  }
}
