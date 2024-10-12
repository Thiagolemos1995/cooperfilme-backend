import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services';
import { SignInDto } from '../dtos';
import { Logger } from '@nestjs/common';
import { TokenResponse } from '../interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(params: SignInDto): Promise<TokenResponse> {
    const { username, password } = params;

    this.logger.log(`username: ${username} is signing in`);

    const user = await this.usersService.findOne(username);
    if (!user) {
      this.logger.error(`username: ${username} failed to sign in`);
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.error(`username: ${username} failed to sign in`);
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    const expiresIn = 3600; // Set expiration time in seconds (e.g., 1 hour)
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn });

    // Decode the token to get iat and exp
    const decodedToken = this.jwtService.decode(accessToken) as {
      iat: number;
      exp: number;
    };

    this.logger.log(`username: ${username} is signed in`);
    return {
      access_token: accessToken,
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    };
  }
}
