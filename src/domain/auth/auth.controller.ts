import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';
import { CreateUserDto } from 'src/domain/user/dto/user.dto';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Sign in a user.' })
  @ApiResponse({
    status: 200,
    description: 'User has been succesfully signed in.',
  })
  signIn(@Body() dto: CreateUserDto): Promise<{ access_token: string }> {
    const signInUser = CreateUserDto.toModel(dto);
    return this.authService.signIn(signInUser);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a user.' })
  @ApiResponse({
    status: 201,
    description: 'User has been succesfully registered.',
  })
  register(@Body() dto: CreateUserDto): Promise<{ access_token: string }> {
    const signUpUser = CreateUserDto.toModel(dto);
    return this.authService.signUp(signUpUser);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile.' })
  @ApiResponse({
    status: 200,
    description: 'User has been succesfully retrieved.',
  })
  getProfile(
    @Request() req: { user: Record<string, any> },
  ): Record<string, any> {
    return req.user;
  }
}
