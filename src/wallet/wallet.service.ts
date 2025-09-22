import { Injectable } from '@nestjs/common';
import { CreateWalletModel } from './model/crud/create-wallet.model';
import { WalletRepositoryService } from './repository/wallet-repository.service';
import { WalletModel } from './model/wallet.model';
import { UpdateWalletDto } from './dto/wallet.dto';
import { Types } from 'mongoose';
import { CreateTransactionModel } from './transaction/model/crud/create-transaction.model';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepositoryService: WalletRepositoryService,
  ) {}

  async createWallet(createModel: CreateWalletModel): Promise<WalletModel> {
    return this.walletRepositoryService.create(createModel);
  }

  async getWallet(): Promise<WalletModel[]> {
    return this.walletRepositoryService.findAll();
  }

  async getWalletById(id: Types.ObjectId): Promise<WalletModel | null> {
    return this.walletRepositoryService.findById(id);
  }

  async updateWallet(
    id: Types.ObjectId,
    dto: UpdateWalletDto,
  ): Promise<WalletModel | null> {
    return this.walletRepositoryService.update(id, dto);
  }

  async updateBalance(
    model: CreateTransactionModel,
  ): Promise<WalletModel | null> {
    return this.walletRepositoryService.updateBalance(model);
  }

  async deleteWallet(id: Types.ObjectId): Promise<WalletModel | null> {
    return this.walletRepositoryService.remove(id);
  }
}