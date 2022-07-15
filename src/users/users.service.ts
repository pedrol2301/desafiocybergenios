import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { hash } from 'bcrypt';

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const pass = await hash(createUserDto.password, 10);
      const users = await this.knex.table('users').insert({
        name: createUserDto.name,
        password: pass,
        email: createUserDto.email,
        role: createUserDto.role || 0,
      });

      return { users };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const users = await this.knex.table('users');

      return { users };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
