import { Controller, HttpStatus, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthDto } from './dto';
import { Auth } from './decorator/auth.decorator';

@Controller('auth')
export class AuthController {
  //authService will auto init when constructor initializing
  constructor(private authService: AuthService) {}
  @Post('signup')
  // signUp(@Req() req: Request) {
  //  @Body("email") email : String
  signUp(@Body() body: AuthDto, @Res({ passthrough: true }) res: Response) {
    // 1. Use annotation validate with library class-validator
    // 2. call method service to handle save data
    res.status(HttpStatus.CREATED);
    return this.authService.signUp(body);
  }
  @Post('signin')
  signIn(@Auth() body: AuthDto) {
    console.log(body);
    //1. check email and password exit
    //2. If exist then return token
    // otherwise throw new Forbidden Exception
    return this.authService.signIn(body);
  }
  // @Post('signinDemo')
  // signInDemo(@Auth() body: AuthDto) {
  //   //1. check email and password exit
  //   //2. If exist then return token
  //   // otherwise throw new Forbidden Exception
  //   console.log(body);
  //   return this.authService.signIn(body);
  // }
}
