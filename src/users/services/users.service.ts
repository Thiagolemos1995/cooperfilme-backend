import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories';
import { Users } from '../entities';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(username: string): Promise<Users | undefined> {
    return this.usersRepository.findOne(username);
  }
}
