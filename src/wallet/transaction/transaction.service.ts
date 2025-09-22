import { Injectable } from '@nestjs/common';
import { CreateTransactionModel } from './model/crud/create-transaction.model';
import { TransactionRepositoryService } from './repository/transaction-repository.service';
import { TransactionModel } from './model/transaction.model';
import { Types } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepositoryService: TransactionRepositoryService,
  ) {}
  async createTransaction(
    model: CreateTransactionModel,
  ): Promise<TransactionModel> {
    return this.transactionRepositoryService.create(model);
  }

  async getTransaction(): Promise<TransactionModel[]> {
    return this.transactionRepositoryService.findAll();
  }

  async getTransactionById(id: string): Promise<TransactionModel | null> {
    const transactionId = new Types.ObjectId(id);

    return this.transactionRepositoryService.findById(transactionId);
  }
}