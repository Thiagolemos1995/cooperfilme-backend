import { Module } from '@nestjs/common';
import { UsersService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities';
import { UsersRepository } from '../repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
