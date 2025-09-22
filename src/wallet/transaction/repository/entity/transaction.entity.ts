import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TransactionModel } from '../../model/transaction.model';
import { TransactionType } from '../../enum/transaction.enum';
import { Wallet } from 'src/wallet/repository/entity/wallet.entity';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop({ type: Types.ObjectId, required: true, ref: Wallet.name })
  walletId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, enum: TransactionType, required: true })
  type: TransactionType;

  static toModel(doc: Transaction): TransactionModel {
    const model = new TransactionModel();

    model.walletId = doc.walletId;
    model.amount = doc.amount;
    model.type = doc.type;

    return model;
  }
}

export const TransactionEntity = SchemaFactory.createForClass(Transaction);