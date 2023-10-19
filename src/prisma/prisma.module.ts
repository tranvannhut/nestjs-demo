import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // this module is used global
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // other module can use
})
export class PrismaModule {}
