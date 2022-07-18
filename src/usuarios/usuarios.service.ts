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
import { InjectModel } from 'nest-knexjs/dist/common';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async create(CreateUsuarioDto: CreateUsuarioDto) {
    try {
      const nsenha = await hash(CreateUsuarioDto.senha,10);
      const usuario = await this.knex.table('usuario').insert({
        nome: CreateUsuarioDto.nome,
        telefone: CreateUsuarioDto.telefone,
        cpf: CreateUsuarioDto.cpf,
        endereco: CreateUsuarioDto.endereco,
        email: CreateUsuarioDto.email,
        senha: nsenha,
        perfil: CreateUsuarioDto.perfil,
      });
      return {usuario};
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const usuarios = await this.knex.table('usuario');
      return usuarios;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

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
