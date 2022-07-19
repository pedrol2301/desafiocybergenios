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
    var updateFields;
    try {

      const usuario = await this.knex.table('usuario').where({idusuario:id});

      updateFields = await this.validarDiferenca(usuario[0],updateUsuarioDto);
      console.log (updateFields.length);
      console.log (updateFields);
      if(updateFields.length > 0){
        if(updateFields['senha']){
          updateFields['senha'] = await hash(updateUsuarioDto.senha,10);
          console.log(updateFields['senha']);
          await this.knex.update(updateFields).where({idusuario:id}).table('usuario');
          return `Usuario atualizado!`;
        }else{
          await this.knex.update(updateFields).where({idusuario:id}).table('usuario');
          return `Usuario atualizado!`;
        }
      }else{
        return `Não houve alterações!`;
      }
      
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
  async validarDiferenca(arr1,arr2) {
    var arr1Props = Object.getOwnPropertyNames(arr1);
    var returnField = [];

    for (var i = 0; i < arr1Props.length; i++) {
      var propName = arr1Props[i];
      
      if (propName == 'senha') {
        console.log('entrou')
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
