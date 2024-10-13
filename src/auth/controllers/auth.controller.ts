import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { SignInDto } from '../dtos';
import { SigninUserUseCase } from '../usecases';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInUserUseCase: SigninUserUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() params: SignInDto) {
    return this.signInUserUseCase.execute(params);
  }
}
