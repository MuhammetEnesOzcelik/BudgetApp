import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Currency } from 'src/enum/currency.enum';

export class CreateWalletDto {
  @IsString()
  walletName: string;

  @IsNumber()
  @IsOptional()
  walletBalance?: number;

  @IsEnum(Currency)
  walletCurrency: Currency;
}

export class UpdateWalletDto extends PartialType(CreateWalletDto) {}
