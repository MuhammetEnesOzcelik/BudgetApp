import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { Transaction } from "./schema/transaction.schema";
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
    constructor(@InjectModel(Transaction.name) private transactionModel: Model<Transaction>) { }

    async create(createTransaction: TransactionDto): Promise<Transaction> {
        const createdTransaction = new this.transactionModel(createTransaction);
        return createdTransaction.save();
    }
}