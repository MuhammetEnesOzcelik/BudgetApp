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
    const userObjId = new Types.ObjectId(model.userId);
    const walletObjId = new Types.ObjectId(model.walletId);
    const categoryObjId = new Types.ObjectId(model.categoryId);
    const createdTransaction = await this.transactionEntity.create({
      userId: userObjId,
      walletId: walletObjId,
      amount: model.amount,
      type: model.type,
      categoryId: categoryObjId,
      date: model.date,
    });

    const transaction = createdTransaction; //???

    return Transaction.toModel(transaction);
  }

  async findAll(
    userId: string,
    walletId: string,
    limit: number,
    offset: number,
  ): Promise<TransactionModel[]> {
    const userObjId = new Types.ObjectId(userId);
    const walletObjId = new Types.ObjectId(walletId);
    const docs = await this.transactionEntity
      .find({ userId: userObjId, walletId: walletObjId })
      .skip(offset)
      .limit(limit)
      .exec();

    return docs.map((doc) => Transaction.toModel(doc));
  }

  async findById(
    userId: string,
    walletId: string,
    transactionId: string,
  ): Promise<TransactionModel | null> {
    const userObjId = new Types.ObjectId(userId);
    const walletObjId = new Types.ObjectId(walletId);
    const transactionObjId = new Types.ObjectId(transactionId);
    const doc = await this.transactionEntity
      .findOne({
        _id: transactionObjId,
        userId: userObjId,
        walletId: walletObjId,
      })
      .exec();

    return doc ? Transaction.toModel(doc) : null;
  }
}
