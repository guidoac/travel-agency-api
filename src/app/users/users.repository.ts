import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UsersRepository');

  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findUser(email): Promise<User> {
    const found = await this.findOneBy({ email });

    if (!found) {
      return null;
    }
    return found;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: User = this.create({
      username,
      email,
      password: hashedPassword,
    });

    try {
      await this.save(user);

      this.logger.log(
        `User with username ${user.username} and id ${user.id} created`,
      );

      return user;
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        const msg = `Username ${username} already exists`;

        this.logger.log(msg);
        throw new ConflictException(msg);
      }

      this.logger.log(`Internal error trying to create the user ${username}`);

      throw new InternalServerErrorException();
    }
  }
}
