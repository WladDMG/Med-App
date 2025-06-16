import { Controller, Post, Body, Get, UseGuards, Request,} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('medicos')
  findMedicos() {
    return this.usersService.findMedicos();
  }

  @Get('me')
@UseGuards(JwtAuthGuard)
getProfile(@Request() req) {
  return this.usersService.findByEmail(req.user.email);
}
}
