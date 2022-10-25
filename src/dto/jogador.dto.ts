import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class jogadorDTO {
  @IsString()
  @IsNotEmpty()
  partNumber: string

  @IsString()
  @IsNotEmpty()
  process: string

  @IsNumber()
  @IsNotEmpty()
  quantity: number
  
  @IsNumber()
  @IsNotEmpty()
  numberSheet: number
}
