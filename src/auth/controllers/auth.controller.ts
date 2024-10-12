import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
