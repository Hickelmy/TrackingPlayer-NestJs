import { Test, TestingModule } from '@nestjs/testing';
import { JogoController } from './jogo.controller';
import { JogoService } from './jogo.service';

describe('JogoController', () => {
  let controller: JogoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JogoController],
      providers: [JogoService],
    }).compile();

    controller = module.get<JogoController>(JogoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
