import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/domain/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserModel } from 'src/domain/user/model/crud/create-user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInUser: CreateUserModel): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(signInUser.name);

    if (!user) {
      throw new NotFoundException('User not found. Please register first.');
    }

    if (!(await bcrypt.compare(signInUser.password, user.password))) {
      throw new UnauthorizedException('Invalid password.');
    }

    const payload = {
      sub: user.id,
      username: user.name,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpUser: CreateUserModel): Promise<{ access_token: string }> {
    const user = await this.userService.createUser(signUpUser);

    const payload = { sub: user.id, username: user.name, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
