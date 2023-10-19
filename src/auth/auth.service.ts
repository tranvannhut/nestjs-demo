import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable({}) //dependency injection
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signUp(authDto: AuthDto) {
    try {
      const hashPassWord = await argon.hash(authDto.password);
      authDto.password = hashPassWord;
      const user = await this.prismaService.user.create({
        data: {
          email: authDto.email,
          password: hashPassWord,
        },
        select: {
          email: true,
          createAt: true,
        },
      });

      return user;
    } catch (error: any) {
      if (error.code == 'P2002') {
        throw new ForbiddenException('Email is exist!');
      }
    }
  }
  async signIn(authDto: AuthDto): Promise<{ accessToken: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { email: authDto.email },
    });
    if (!user) {
      throw new NotFoundException(`User not found with ${authDto.email}`);
    }
    const passwordLoginMatch = await argon.verify(
      user.password,
      authDto.password,
    );
    if (!passwordLoginMatch) {
      throw new UnauthorizedException('Password is invalid');
    }
    delete user.password; // not necessary return password
    return this.convertToJwtString(user.id, user.email);
    // return user;
  }
  async convertToJwtString(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return { accessToken: jwtString };
  }
}
