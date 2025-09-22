import { CreateWalletModel } from '../model/crud/create-wallet.model';
import { Currency } from 'src/wallet/enum/currency.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from '@nestjs/class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class CreateWalletDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsNumber()
  @ApiProperty({ required: true })
  balance?: number;

  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.toUpperCase())
  @IsEnum(Currency)
  @ApiProperty({ required: true })
  currency?: Currency;

  static toModel(dto: CreateWalletDto): CreateWalletModel {
    const model = new CreateWalletModel();

    model.name = dto.name;
    model.balance = dto.balance;
    model.currency = dto.currency;

    return model;
  }
}

export class UpdateWalletDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  balance?: number;
}
