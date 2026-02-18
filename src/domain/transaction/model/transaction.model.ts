import { TransactionType } from '../enum/transaction.enum';
import { BaseModel } from 'src/common/model';
export class TransactionModel extends BaseModel {
  userId: string;
  walletId: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: number;
  description?: string;
}
