import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async login(email: string, senha: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.senha !== senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: (user as any)._id, email: user.email, tipo: user.tipo };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


}
