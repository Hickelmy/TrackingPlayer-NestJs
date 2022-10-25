import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
} from '@nestjs/common';
import { CriarJogadorDto } from 'src/dto/criar-jogador.dto';
import { Jogador } from 'src/interface/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoreValidacaoParametros } from 'src/pipes/jogadore-validacao-parametros.pepe';

@Controller('api/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
    @Param('_id', JogadoreValidacaoParametros) _id: string,
  ): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, criarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadoresPeloId(
    @Param('_id', JogadoreValidacaoParametros) _id: string,
  ): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadoresPeloId(_id);
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param('_id', JogadoreValidacaoParametros) _id: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogador(_id);
  }
}
