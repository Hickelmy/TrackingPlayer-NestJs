import { IsNumber, isNumber, IsString } from 'class-validator';

export class CriarJogadorDto {
  @IsString()
  readonly telefoneCelular: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly nome: string;
  @IsString()
  ranking: string;
  @IsNumber()
  posicaoRanking: number;
  @IsString()
  urlFotoJogador: string;
}
