import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
