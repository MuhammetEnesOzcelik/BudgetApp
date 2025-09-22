import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletEntity } from './entity/wallet.entity';
import { WalletRepositoryService } from './wallet-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletEntity }]),
  ],
  providers: [WalletRepositoryService],
  exports: [WalletRepositoryService],
})
export class WalletRepositoryModule {}