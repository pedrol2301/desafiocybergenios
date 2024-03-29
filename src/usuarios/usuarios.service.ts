import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Knex } from 'knex';
import { hash, compare } from 'bcrypt';

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nest-knexjs/dist/common';
import { Usuario } from './entities/usuario.entity';

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
      return `Usuário ID: ${usuario[0]} criado com sucesso!`;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const usuarios = await this.knex.select([
      "nome",
      "cpf",
      "email",
      "endereco",
      "telefone",
      "perfil",
    ]).table('usuario');
      return usuarios;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }

  async findOne(id: number) {
    try {
      const usuario = await this.knex.select([
        "nome",
        "cpf",
        "email",
        "endereco",
        "telefone",
        "perfil",
      ]).table('usuario').where({"idusuario":id});
      return usuario;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    var updateFields = [];
    try {

      const usuario = await this.knex.table('usuario').where({idusuario:id});

      updateFields = await this.validarDiferenca(usuario[0],updateUsuarioDto);
      if(updateFields){
        if(updateFields['senha']){
          updateFields['senha'] = await hash(updateUsuarioDto.senha,10);
          await this.knex.update(updateFields).where({idusuario:id}).table('usuario');
          return `Usuário ID: ${id} atualizado!`;
        }else{
          await this.knex.update(updateFields).where({idusuario:id}).table('usuario');
          return `Usuário ID: ${id} atualizado!`;
        }
      }else{
        return `Não houve alterações no usuário ID: ${id}!`;
      }
      
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    
  }

  async remove(id: number) {
    try {
      const usuario = await this.knex.delete().table('usuario').where({idusuario:id});
      if(usuario)
          return `Usuário ID: ${id} foi deletado!`;
      else
          return `Houve um problema ao deletar o usuário ID: ${id}`
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    
  }

  async findByEmail(email:string): Promise<any | undefined> {
    try {
      const usuario = await this.knex.select().table('usuario').where({email:email});
      console.log(usuario)
      return usuario;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    
  }
  

  async validarDiferenca(arr1,arr2) {
    var arr1Props = Object.getOwnPropertyNames(arr1);
    var returnField = [];

    for (var i = 0; i < arr1Props.length; i++) {
      var propName = arr1Props[i];
      
      if (propName == 'senha') {
        let result = await compare(arr1[propName],arr2[propName]);
        
        if(!result)
          returnField[propName] = arr2[propName];
      }else if (arr1[propName] !== arr2[propName] && propName != 'senha' && arr2[propName] != undefined) {
        returnField[propName] = arr2[propName];
      }


    }
    return returnField;
  }
}
