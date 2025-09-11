import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { TransactionType } from 'src/enum/transaction.enum';
import { Transform } from 'class-transformer';
import { Currency } from 'src/enum/currency.enum';

export class TransactionDto {
  @IsNotEmpty()
  @IsString()
  walletId: string;

  @IsString()
  @IsOptional()
  walletName?: string;

  @IsNumber()
  amount: number;

  @Transform(({ value }: { value: string }) => value.toUpperCase())
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsEnum(Currency)
  @IsOptional()
  walletCurrency?: Currency;

  @IsString()
  @IsOptional()
  description?: string;
}
