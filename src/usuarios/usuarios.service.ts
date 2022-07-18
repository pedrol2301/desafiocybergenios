import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Knex } from 'knex';
import { hash } from 'bcrypt';

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const pass = await hash(CreateUsuarioDto.password, 10);
      const users = await this.knex.table('users').insert({
        name: CreateUsuarioDto.name,
        password: pass,
        email: CreateUsuarioDto.email,
        role: CreateUsuarioDto.role || 0,
      });

      return { users };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
