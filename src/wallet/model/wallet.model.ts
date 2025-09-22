import { Types } from 'mongoose';
import { Currency } from '../enum/currency.enum';

export class WalletModel {
  id?: Types.ObjectId;
  name?: string;
  balance?: number;
  currency?: Currency;
}