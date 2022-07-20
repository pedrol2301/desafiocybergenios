import { IsNotEmpty, IsString } from 'class-validator';

export class Usuario {

    @IsString()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public senha: string;

    @IsString()
    @IsNotEmpty()
    public perfil: string;

}
