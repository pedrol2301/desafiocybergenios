import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUsuarioDto {
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
