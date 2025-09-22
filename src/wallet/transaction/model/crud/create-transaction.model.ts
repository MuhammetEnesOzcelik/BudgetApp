import { Types } from 'mongoose';
import { TransactionType } from '../../enum/transaction.enum';

export class CreateTransactionModel {
  id?: Types.ObjectId;
  walletId: Types.ObjectId;
  amount: number;
  type: TransactionType;
}
