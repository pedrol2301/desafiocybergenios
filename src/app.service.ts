import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs/dist/common';
import { Knex } from 'knex';
import { Usuario } from './usuarios/entities/usuario.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AppService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  getHello(): string {
    return 'Hello World!';
  }

  async Login(Usuario: Usuario){
    try {
      let usuario:any = await this.knex.select().table('usuario').where({email:Usuario.email});
      if(usuario){
        let result = await compare(Usuario.senha,usuario.senha);
        if (result) {
          
        } else {
          throw new HttpException('Senha Incorreta!', HttpStatus.NOT_ACCEPTABLE);
        }
      }else{
        throw new HttpException('Email incorreto!', HttpStatus.NOT_ACCEPTABLE);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
