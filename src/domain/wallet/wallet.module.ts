import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletRepositoryModule } from './repository/wallet-repository.module';
import { UserModule } from 'src/domain/user/user.module';

@Module({
  imports: [WalletRepositoryModule, UserModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
