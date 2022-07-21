import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs/dist/common';
import { Knex } from 'knex';
import { Usuario } from './usuarios/entities/usuario.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AppService {
  index(): string {
    return 'Bem vindo ao desafio de Back-End Cyber Gênios';
  }

}
