import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction } from './entity/transaction.entity';
import { CreateTransactionModel } from '../model/crud/create-transaction.model';
import { TransactionModel } from '../model/transaction.model';

@Injectable()
export class TransactionRepositoryService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionEntity: Model<Transaction>,
  ) {}

  async create(model: CreateTransactionModel): Promise<TransactionModel> {
    const createdTransaction = await this.transactionEntity.create({
      walletId: model.walletId,
      amount: model.amount,
      type: model.type,
    });

    const transaction = createdTransaction;

    return Transaction.toModel(transaction);
  }

  async findAll(walletId: string): Promise<TransactionModel[]> {
    const Id = new Types.ObjectId(walletId);
    const docs = await this.transactionEntity.find({ walletId: Id }).exec();

    return docs.map((doc) => Transaction.toModel(doc));
  }

  async findById(
    walletObjId: Types.ObjectId,
    transactionId: Types.ObjectId,
  ): Promise<TransactionModel | null> {
    const doc = await this.transactionEntity
      .findOne({
        _id: transactionId,
        walletId: walletObjId,
      })
      .exec();

    return doc ? Transaction.toModel(doc) : null;
  }
}
