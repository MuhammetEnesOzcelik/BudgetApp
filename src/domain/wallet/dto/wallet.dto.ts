import { CreateWalletModel } from '../model/crud/create-wallet.model';
import { Currency } from 'src/common/enum/index';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, description: 'Name of the wallet.' })
  name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Balance of the wallet.' })
  balance?: number;

  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.toUpperCase())
  @IsEnum(Currency)
  @ApiProperty({ description: 'Currency of the wallet.' })
  currency?: Currency;

  static toModel(userId: string, dto: CreateWalletDto): CreateWalletModel {
    const model = new CreateWalletModel();

    model.userId = userId;
    model.name = dto.name;
    model.balance = dto.balance;
    model.currency = dto.currency;

    return model;
  }
}
