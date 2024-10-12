import { DataSource, FindOperator, ILike } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Users } from '../entities';
import { FilterUserDto } from '../dtos';
import { ERole } from '../enums';

interface IWhereOptions {
  where: {
    username?: FindOperator<string>;
    role?: ERole;
  };
}

@Injectable()
export class UsersRepository {
  constructor(private readonly dataSource: DataSource) {}

  async create(user: Users): Promise<Users> {
    const entityManager = this.dataSource.createEntityManager();

    try {
      return await entityManager.save(Users, user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(payload: FilterUserDto): Promise<[Users[], number]> {
    const entityManager = this.dataSource.createEntityManager();
    try {
      const { order, skip, take, username, role } = payload;

      const whereOptions: IWhereOptions = { where: {} };

      if (username) {
        whereOptions.where.username = ILike(`%${username}%`);
      }

      if (role) {
        whereOptions.where.role = role;
      }

      const result = await entityManager.find(Users, {
        skip,
        take,
        order: {
          username: order ?? 'ASC',
        },
        ...whereOptions,
      });

      return [result, result.length];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(username: string): Promise<Users> {
    const entityManager = this.dataSource.createEntityManager();
    try {
      const user = await entityManager.findOne(Users, {
        where: {
          username: username,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number): Promise<void> {
    const entityManager = this.dataSource.createEntityManager();
    try {
      await entityManager.delete(Users, id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
