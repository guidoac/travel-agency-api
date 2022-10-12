import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/app/users/user.entity';
import { UsersService } from 'src/app/users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = await this.validateUser(username, password);

    if (!user) {
      this.logger.log(`User with username ${username} is invalid`);
      throw new UnauthorizedException();
    }

    const payload = { username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findUser(username);

    if (user && bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
