import { Between, DataSource, FindOperator, ILike } from 'typeorm';
import {
  CreateScriptDto,
  ScriptFilter,
  ScriptStatusResponseDto,
  VoteDto,
} from '../dtos';
import { Script, ScriptState } from '../entities';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EScriptState, VoteEnum } from '../enums';

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

  async findScriptStatusById(id: string): Promise<ScriptStatusResponseDto> {
    const em = this.dataSource.createEntityManager();

    try {
      const script = await em.findOne(Script, {
        select: ['status', 'email', 'title', 'author', 'createdAt', 'genre'],
        where: { id },
      });

      if (!script) {
        throw new NotFoundException('Script not found');
      }

      const scriptStatusResponseDto = new ScriptStatusResponseDto({
        title: script.title,
        status: script.status,
        createdAt: script.createdAt,
      });

      return scriptStatusResponseDto;
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

  async updateScriptStatus(
    id: string,
    newStatus: EScriptState,
  ): Promise<Script> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const script = await queryRunner.manager.findOne(Script, {
        where: { id },
      });

      if (!script) {
        throw new Error('Script not found');
      }

      script.status = newStatus;
      await queryRunner.manager.save(script);

      await queryRunner.commitTransaction();

      return script;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async voteOnScript(payload: VoteDto): Promise<Script> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { id, vote } = payload;

    try {
      const script = await queryRunner.manager.findOne(Script, {
        where: { id },
      });

      if (!script) {
        throw new NotFoundException('Script not found');
      }

      if (vote === VoteEnum.UP) {
        script.votes += 1;
      } else if (vote === VoteEnum.DOWN) {
        if (script.votes <= 0) {
          throw new BadRequestException('Script dont have votes');
        }
        script.votes -= 1;
      }

      await queryRunner.manager.save(script);

      await queryRunner.commitTransaction();

      return script;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }
}
