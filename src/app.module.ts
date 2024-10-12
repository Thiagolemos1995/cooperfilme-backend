import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/modules';
import { UsersModule } from './users/module';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './config/configurations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './common/utils';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseConfig = configService.get<DatabaseConfig>('database');

        if (!databaseConfig) {
          throw new Error('Database configuration not found');
        }

        return {
          type: 'postgres',
          host: databaseConfig.host ?? 'localhost',
          port: databaseConfig.port ?? 5435,
          username: databaseConfig.user ?? 'cooperfilme',
          password: databaseConfig.password ?? 'cooperfilme',
          database: databaseConfig.database ?? 'cooperfilme_db',
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
