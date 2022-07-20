import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { Knex } from 'knex';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nest-knexjs/dist/common';


@Injectable()
export class CarrosService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async create(createCarroDto: CreateCarroDto) {
    try {
      const carro = await this.knex.table('carro').insert({
        nome: createCarroDto.nome,
        marca: createCarroDto.marca,
        modelo: createCarroDto.modelo,
        ano: createCarroDto.ano,
      });
      return `Carro ID: ${carro[0]} criado com sucesso!`;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const carros = await this.knex.table('carro');
      return carros;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const carro = await this.knex.table('carro').where({"idusuario":id});
      return carro;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateCarroDto: UpdateCarroDto) {
    var updateFields = [];
    try {

      const carro = await this.knex.table('carro').where({idcarro:id});

      updateFields = await this.validarDiferenca(carro[0],updateCarroDto);
      if(updateFields){
          await this.knex.update(updateFields).where({idcarro:id}).table('carro');
          return `Carro ID: ${id} atualizado!`;
      }else{
        return `Não houve alterações no carro ID: ${id}!`;
      }
      
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const carro = await this.knex.delete().table('carro').where({idcarro:id});
      if(carro)
          return `Carro ID: ${id} foi deletado!`;
      else
          return `Houve um problema ao deletar o carro ID: ${id}`
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  validarDiferenca(arr1,arr2) {
    var arr1Props = Object.getOwnPropertyNames(arr1);
    var returnField = [];

    for (var i = 0; i < arr1Props.length; i++) {
      var propName = arr1Props[i];
      
     if (arr1[propName] !== arr2[propName] && arr2[propName] != undefined) {
        returnField[propName] = arr2[propName];
      }


    }
    return returnField;
  }
}
