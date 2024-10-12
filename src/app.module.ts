import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/modules';
import { UsersModule } from './users/module';
import { ConfigModule } from '@nestjs/config';
import configurations from './config/configurations';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
