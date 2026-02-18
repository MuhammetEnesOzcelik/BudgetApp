import { BaseModel } from 'src/common/model';
import { TransactionType } from 'src/domain/transaction/enum/transaction.enum';

export class CategoryModel extends BaseModel {
  userId: string;
  name: string;
  type: TransactionType;
  colour?: string;
}
