import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TransactionModel } from '../../model/transaction.model';
import { TransactionType } from '../../enum/transaction.enum';
import { Wallet } from 'src/domain/wallet/repository/entity/wallet.entity';
import { Category } from 'src/domain/category/repository/entity/category.entity';
import { Base } from 'src/common/entity/index';
import { getCurrentTimeInSec } from 'src/common/util/time';
import { User } from 'src/domain/user/repository/entity/user.entity';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ id: true, timestamps: true })
export class Transaction extends Base {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: Wallet.name })
  walletId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, enum: TransactionType, required: true })
  type: TransactionType;

  @Prop({ type: Types.ObjectId, required: true, ref: Category.name })
  categoryId: Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
    default: getCurrentTimeInSec,
  })
  date: number;

  @Prop({ type: String })
  description: string;

  static toModel(doc: Transaction): TransactionModel {
    const model = new TransactionModel();

    model.userId = doc.userId.toString();
    model.walletId = doc.walletId.toString();
    model.amount = doc.amount;
    model.type = doc.type;
    model.categoryId = doc.categoryId.toString();
    model.date = doc.date;
    model.description = doc.description;

    model.createdAt = doc.createdAt;
    model.updatedAt = doc.updatedAt;

    return model;
  }
}

export const TransactionEntity = SchemaFactory.createForClass(Transaction);
