import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './dto.user.create';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
