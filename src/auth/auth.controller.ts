import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthResult, AuthServive } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AccessTokenGaurd } from './gaurds/access-token.gaurd';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from './types/jwt-payload.type';
import { SafeUser } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthServive) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto): Promise<AuthResult> {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<AuthResult> {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshTokenDto): Promise<AuthResult> {
    return this.authService.refresh(dto);
  }

  @Post('logout')
  @UseGuards(AccessTokenGaurd)
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: JwtPayload): Promise<{ success: true }> {
    return this.authService.logout(user.sub);
  }

  @Get('me')
  @UseGuards(AccessTokenGaurd)
  @HttpCode(HttpStatus.OK)
  async getProfile(@CurrentUser() user: JwtPayload): Promise<SafeUser> {
    return this.authService.getProfile(user.sub);
  }
}
