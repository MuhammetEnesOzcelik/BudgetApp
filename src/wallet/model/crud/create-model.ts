import { Types } from 'mongoose';
import { Currency } from 'src/wallet/enum/currency.enum';

export class CreateWalletModel {
  id?: Types.ObjectId;
  name?: string;
  balance?: number;
  currency?: Currency;
}