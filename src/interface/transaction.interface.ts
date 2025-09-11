import { TransactionType } from 'src/enum/transaction.enum';

export interface Transaction {
  walletId: string;
  walletName?: string;
  amount: number;
  type: TransactionType;
  description?: string;
}
