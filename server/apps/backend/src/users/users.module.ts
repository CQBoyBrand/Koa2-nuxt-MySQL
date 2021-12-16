import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from '@common/common/strategy/local.strategy';
import {JwtStrategy} from '@common/common/strategy/jwt.strategy';

@Module({
  imports: [
      PassportModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
