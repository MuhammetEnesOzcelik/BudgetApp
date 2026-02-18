import { Module } from '@nestjs/common';
import { TransactionRepositoryModule } from './repository/transaction-repository.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { WalletModule } from 'src/domain/wallet/wallet.module';
import { CategoryModule } from 'src/domain/category/category.module';
import { UserModule } from 'src/domain/user/user.module';

@Module({
  imports: [
    TransactionRepositoryModule,
    UserModule,
    WalletModule,
    CategoryModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
