import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsString()
    public nome: string;


    @IsString()
    public telefone: string;


    @IsNumber()
    @IsNotEmpty()
    public cpf: string;

    @IsString()
    public endereco: string;

    @IsString()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public senha: string;

    @IsString()
    @IsNotEmpty()
    public perfil: string;
}
