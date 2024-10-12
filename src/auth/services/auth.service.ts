import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services';
import { SignInDto } from '../dtos';
import { TokenResponse } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(params: SignInDto): Promise<TokenResponse> {
    const { username, password } = params;
    const user = await this.usersService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
    };

    const expiresIn = 3600; // Set expiration time in seconds (e.g., 1 hour)
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn });

    // Decode the token to get iat and exp
    const decodedToken = this.jwtService.decode(accessToken) as {
      iat: number;
      exp: number;
    };

    return {
      access_token: accessToken,
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    };
  }
}
