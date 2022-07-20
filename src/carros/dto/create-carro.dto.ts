import { IsNumber, IsString } from 'class-validator';

export class CreateCarroDto {
    @IsString()
    public nome: string;


    @IsString()
    public marca: string;


    @IsString()
    public modelo: string;


    @IsNumber()
    public ano: string;

}
