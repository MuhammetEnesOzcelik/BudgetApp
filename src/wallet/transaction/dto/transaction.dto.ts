import { IsEnum, IsNumber } from 'class-validator';
import { CreateTransactionModel } from '../model/crud/create-transaction.model';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../enum/transaction.enum';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateTransactionDto {
  @IsNumber()
  @ApiProperty()
  amount: number;

  @Transform(({ value }: { value: string }) => value?.toUpperCase())
  @IsEnum(TransactionType)
  @ApiProperty()
  type: TransactionType;

  static toModel(
    dto: CreateTransactionDto,
    walletId: string,
  ): CreateTransactionModel {
    const model = new CreateTransactionModel();

    model.walletId = new Types.ObjectId(walletId);
    model.amount = dto.amount;
    model.type = dto.type;

    return model;
  }
}
