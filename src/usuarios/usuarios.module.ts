import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsuariosController],
  imports: [(forwardRef(()=> AuthModule))],
  providers: [UsuariosService],
  exports:[UsuariosService]
})
export class UsuariosModule {}
