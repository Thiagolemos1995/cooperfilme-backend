import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services';
import { AuthController } from '../controllers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/services';
import { JWTConfig } from 'src/common/utils';
import { UsersRepository } from 'src/users/repositories';
import { SigninUserUseCase } from '../usecases';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const jwtConfig = configService.get<JWTConfig>('jwt');

        if (!jwtConfig) {
          throw new Error('JWT config is not defined');
        }

        return {
          secret: jwtConfig.jwtSecretKey,
          signOptions: { expiresIn: '1h', algorithm: 'HS256' },
        };
      },
    }),
  ],
  providers: [AuthService, UsersService, UsersRepository, SigninUserUseCase],
  controllers: [AuthController],
})
export class AuthModule {}
