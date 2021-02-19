import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MagicUrlModule } from './magic-url/magic-url.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(
      process.env.MONGODB_URL,
    ),
    UsersModule,
    AuthModule,
    MagicUrlModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
