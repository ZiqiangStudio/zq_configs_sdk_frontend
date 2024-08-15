import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(
    name: string,
    password: string,
  ): any {
    if (name) {
      console.log('current', name);
    } else {
      console.log('current', name);
    }

    const user = await this.usersService.findByName(name);
    if (user && user.password === password) {
      const { password, ...userInfo } = user;
      return userInfo;
    }
  }

  async sign(id: number, name: string) {
    return {
      token: this.jwtService.sign({
        name,
        sub: id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      })
    };
  }

  decode(req: Request): { id: number; name: string } {
    const { sub, name } = this.jwtService.decode(
      req.headers.authorization.split(' ')[1],
      {
        json: true,
      }
    ) as any;
    return { id: sub, name };
  }
}
