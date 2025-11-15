import { ApiProperty } from '@nestjs/swagger';

export class UsuarioResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  rol: string;
}

export class AuthResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: UsuarioResponseDto })
  usuario: UsuarioResponseDto;
}