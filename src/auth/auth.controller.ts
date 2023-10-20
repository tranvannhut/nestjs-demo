import { Response } from 'express';
import {
  Controller,
  HttpStatus,
  Post,
  Body,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthDto } from './dto';
// import { Auth } from './decorator/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from './decorator/auth.decorator';

@Controller('auth')
@ApiTags('auth')
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
  signIn(
    @Auth(new ValidationPipe({ validateCustomDecorators: true })) body: AuthDto,
  ): Promise<{ accessToken: string }> {
    console.log(body);
    //1. check email and password exit
    //2. If exist then return token
    // otherwise throw new Forbidden Exception
    return this.authService.signIn(body);
  }
}
