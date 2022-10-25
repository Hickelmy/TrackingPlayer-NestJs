import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { CriarJogadorDto } from 'src/dto/criar-jogador.dto';
import { Jogador } from 'src/interface/jogador.interface';
// import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    // this.logger.log(`criarJogadorDto: $(criaJogadorDto)`);

    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com e-mail ${email} ja cadastrado`,
      );
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    criarJogadorDto: CriarJogadorDto,
  ): Promise<void> {
    // this.logger.log(`criarJogadorDto: $(criaJogadorDto)`);

    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Não foi possivel cadastrar ,Jogador com id ${_id} não encontrado`,
      );
    }

    await this.jogadorModel
      .findByIdAndUpdate({ _id }, { $set: criarJogadorDto })
      .exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadoresPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Não foi possivel consultar , Jogador com id ${_id} nao encontrado`,
      );
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Não foi possivel deletar , Jogador com id ${_id} nao encontrado`,
      );
    }

    return await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
