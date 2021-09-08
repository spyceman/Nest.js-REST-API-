import { Body, Controller, Get, Inject, Post, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginService } from './login.service';

@ApiTags('Authentification')
@Controller('auth')
export class LoginController {
constructor(private readonly loginService : LoginService) {}

@ApiOperation({summary: 'Logging in with facebook'})
@ApiResponse({status: 200})
@Get("/facebook")
@UseGuards(AuthGuard("facebook"))
async facebookLogin(): Promise<any> {
  return HttpStatus.OK;
}

@ApiOperation({summary: 'Logging in with login and password'})
@ApiResponse({status: 201, type: LoginUserDto})
@Post('login')
login(@Body() user: LoginUserDto){
    return this.loginService.login(user)
}

@ApiOperation({summary: 'Registration with login, password and role'})
@ApiResponse({status: 201, type: CreateUserDto})
@Post('registration')
registration(@Body() user: CreateUserDto){
    return this.loginService.registration(user)
}
}
