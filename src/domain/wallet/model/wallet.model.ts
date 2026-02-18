import { BaseModel } from 'src/common/model';
import { Currency } from 'src/common/enum/index';
export class WalletModel extends BaseModel {
  userId: string;
  name: string;
  balance?: number;
  currency?: Currency;
}
