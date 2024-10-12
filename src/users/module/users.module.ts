import { Module } from '@nestjs/common';
import { UsersService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
