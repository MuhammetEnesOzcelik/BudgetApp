import { Module } from '@nestjs/common';
import { TransactionRepositoryModule } from './repository/transaction-repository.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [TransactionRepositoryModule, WalletModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}