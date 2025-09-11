import { IsString, IsNumber, IsEmpty, IsEnum } from 'class-validator';
import { TransactionType } from 'src/enum/transaction_type.enum';

export class TransactionDto {
    @IsEmpty()
    @IsString()
    walletId: string;

    @IsNumber()
    amount: number;

    @IsEnum(TransactionType)
    type: TransactionType;
}