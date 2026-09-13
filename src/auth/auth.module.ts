import { Module } from '@nestjs/common';
import { AuthServive } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AccessTokenGaurd } from './gaurds/access-token.gaurd';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [AuthServive, AccessTokenGaurd],
  controllers: [AuthController],
})
export class AuthModule {}
