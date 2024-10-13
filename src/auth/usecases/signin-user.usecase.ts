import { UseCase } from 'src/common/interfaces';
import { AuthService } from '../services';
import { SignInDto } from '../dtos';
import { TokenResponse } from '../interfaces';

export class SigninUserUseCase implements UseCase<SignInDto, TokenResponse> {
  constructor(private readonly authService: AuthService) {}

  async execute(payload: SignInDto): Promise<TokenResponse> {
    return this.authService.signIn(payload);
  }
}
