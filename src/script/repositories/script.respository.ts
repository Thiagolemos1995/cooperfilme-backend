import { Between, DataSource, FindOperator, ILike } from 'typeorm';
import { CreateScriptDto, ScriptFilter } from '../dtos';
import { Script, ScriptState } from '../entities';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EScriptState } from '../enums';
import { QueryParams } from 'src/users/dtos';

interface IWhereOptions {
  where: {
    email?: FindOperator<string>;
    createdAt?: FindOperator<Date>;
    status?: EScriptState;
  };
}

@Injectable()
export class ScriptRepository {
  constructor(private readonly dataSource: DataSource) {}

  async create(payload: CreateScriptDto): Promise<Script> {
    const em = this.dataSource.createEntityManager();

    try {
      const scriptEntity = new Script({
        email: payload.email,
        author: payload.author,
        title: payload.title,
        content: payload.content,
        genre: payload.genre,
      });

      const script = await em.save(scriptEntity);

      const scriptStateEntity = new ScriptState({
        script,
        state: EScriptState.AWAITING_ANALYSIS,
      });

      await em.save(scriptStateEntity);

      return script;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(params: ScriptFilter): Promise<[Script[], number]> {
    const em = this.dataSource.createEntityManager();
    const { take, skip, order, email, status, createdAt } = params;

    const whereOptions: IWhereOptions = { where: {} };

    if (email) {
      whereOptions.where.email = ILike(`%${email}%`);
    }
    if (createdAt) {
      whereOptions.where.createdAt = Between(
        new Date(createdAt),
        new Date(createdAt),
      );
    }

    if (status) {
      whereOptions.where.status = status;
    }

    try {
      const scripts = await em.findAndCount(Script, {
        skip,
        take,
        order: {
          createdAt: order ?? 'DESC',
        },
        ...whereOptions,
      });

      return scripts;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findScriptNamesAndStatuses(
    params: QueryParams,
  ): Promise<{ title: string; status: EScriptState }[]> {
    const em = this.dataSource.createEntityManager();
    const { order, skip, take } = params;

    try {
      const scripts = await em.find(Script, {
        select: ['title'],
        skip,
        take,
        order: {
          createdAt: order ?? 'DESC',
        },
      });

      return scripts.map((script) => ({
        title: script.title,
        status: script.status,
      }));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string): Promise<Script | null> {
    const em = this.dataSource.createEntityManager();

    try {
      const script = await em.findOne(Script, { where: { id } });
      return script;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
