import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionEntity } from './entity/transaction.entity';
import { TransactionRepositoryService } from './transaction-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionEntity },
    ]),
  ],
  providers: [TransactionRepositoryService],
  exports: [TransactionRepositoryService],
})
export class TransactionRepositoryModule {}