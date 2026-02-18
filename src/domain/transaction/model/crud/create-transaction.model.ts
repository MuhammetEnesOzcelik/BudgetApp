import { TransactionType } from '../../enum/transaction.enum';
import { BaseModel } from 'src/common/model';
import { CreateCategoryModel } from 'src/domain/category/model/crud/create-category.model';

export class CreateTransactionModel extends BaseModel {
  userId: string;
  walletId: string;
  amount: number;
  type: TransactionType;
  categoryId?: string;
  createCategory?: CreateCategoryModel;
  date: number;
  description?: string;
}
