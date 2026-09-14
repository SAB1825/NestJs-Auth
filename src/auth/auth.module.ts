import { Module } from '@nestjs/common';
import { AuthServive } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AccessTokenGaurd } from './gaurds/access-token.gaurd';
import { GoogleAuthService } from './google-auth.services';
import { GithubAuthService } from './github-auth.service';
import { MailService } from './mail.service';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [
    AuthServive,
    AccessTokenGaurd,
    GoogleAuthService,
    GithubAuthService,
    MailService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
