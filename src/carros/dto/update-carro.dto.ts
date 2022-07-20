import { PartialType } from '@nestjs/mapped-types';
import { CreateCarroDto } from './create-carro.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCarroDto extends PartialType(CreateCarroDto) {
    @IsString()
    public nome: string;


    @IsString()
    public marca: string;


    @IsString()
    public modelo: string;


    @IsNumber()
    public ano: string;

}
