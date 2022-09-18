import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepostory: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepostory.createUser(createUserDto);
  }

  async findUser(username: string): Promise<User> {
    return await this.usersRepostory.findUser(username);
  }
}
