import { IsString, IsNumber, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TransactionType } from 'src/enum/transaction.enum';
import { Transform } from 'class-transformer';

export class TransactionDto {
    @IsNotEmpty()
    @IsString()
    walletId: string;

    @IsString()
    @IsOptional()
    walletName?: string;

    @IsNumber()
    amount: number;

    @IsString()
    @IsOptional()
    description?: string;

    @Transform(({ value }) => value.toUpperCase())
    @IsEnum(TransactionType)
    type: TransactionType;
}