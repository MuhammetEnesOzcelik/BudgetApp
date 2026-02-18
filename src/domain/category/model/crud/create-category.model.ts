import { TransactionType } from 'src/domain/transaction/enum/transaction.enum';
import { BaseModel } from 'src/common/model';

export class CreateCategoryModel extends BaseModel {
  userId: string;
  name: string;
  type: TransactionType;
  colour?: string;
}
