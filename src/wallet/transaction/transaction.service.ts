import { Injectable } from '@nestjs/common';
import { CreateTransactionModel } from './model/crud/create-transaction.model';
import { TransactionRepositoryService } from './repository/transaction-repository.service';
import { TransactionModel } from './model/transaction.model';
import { WalletService } from '../wallet.service';
import { Types } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepositoryService: TransactionRepositoryService,
    private readonly walletService: WalletService,
  ) {}
  async createTransaction(
    model: CreateTransactionModel,
  ): Promise<TransactionModel> {
    return this.transactionRepositoryService.create(model);
  }

  async getTransaction(walletId: string): Promise<TransactionModel[]> {
    return this.transactionRepositoryService.findAll(walletId);
  }

  async getTransactionById(
    walletId: string,
    id: string,
  ): Promise<TransactionModel | null> {
    const walletObjId = new Types.ObjectId(walletId);
    const transactionId = new Types.ObjectId(id);
    return this.transactionRepositoryService.findById(
      walletObjId,
      transactionId,
    );
  }
}
