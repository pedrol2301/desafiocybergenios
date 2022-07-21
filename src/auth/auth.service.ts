import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
      private usuarioService: UsuariosService,
      private jwtService: JwtService,

    ){}

    async validarUsuario(email:string, senha:string) {
        const usuario = await this.usuarioService.findByEmail(email);
        if (usuario && compareSync(senha, usuario[0].senha)) {
          const { senha, ...result } = usuario[0];
          return result;
        }
        return null;
      }

      async login(user: any) {
        const payload = { email: user.email, id: user.idusuario, perfil:user.perfil };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
