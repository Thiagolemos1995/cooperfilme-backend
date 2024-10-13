import { UseCase } from 'src/common/interfaces';
import { AuthService } from '../services';
import { SignInDto } from '../dtos';
import { TokenResponse } from '../interfaces';
import {
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SigninUserUseCase implements UseCase<SignInDto, TokenResponse> {
  constructor(private readonly authService: AuthService) {}

  async execute(payload: SignInDto): Promise<TokenResponse> {
    try {
      return this.authService.signIn(payload);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error);
      }

      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
