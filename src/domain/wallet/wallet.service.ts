import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletModel } from './model/crud/create-wallet.model';
import { WalletRepositoryService } from './repository/wallet-repository.service';
import { WalletModel } from './model/wallet.model';
import { CreateTransactionModel } from 'src/domain/transaction/model/crud/create-transaction.model';
import { UserService } from 'src/domain/user/user.service';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepositoryService: WalletRepositoryService,
    private readonly userService: UserService,
  ) {}

  async createWallet(model: CreateWalletModel): Promise<WalletModel> {
    const user = await this.userService.getUserById(model.userId);

    if (!user) {
      throw new NotFoundException(
        `User with ${model.userId} ID number could not found.`,
      );
    }

    return this.walletRepositoryService.create(model);
  }

  async getWallet(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<WalletModel[]> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException(
        `User with ${userId} ID number could not found.`,
      );
    }

    return await this.walletRepositoryService.findAll(userId, limit, offset);
  }

  async getWalletById(userId: string, id: string): Promise<WalletModel> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException(
        `User with ${userId} ID number could not found.`,
      );
    }

    const wallet = await this.walletRepositoryService.findById(userId, id);

    if (!wallet) {
      throw new NotFoundException(`Wallet with ${id} ID could not found.`);
    }

    return wallet;
  }

  async updateWallet(model: CreateWalletModel): Promise<WalletModel> {
    const user = await this.userService.getUserById(model.userId);

    if (!user) {
      throw new NotFoundException(
        `User with ${model.userId} ID number could not found.`,
      );
    }

    const updatedWallet = await this.walletRepositoryService.update(model);

    if (!updatedWallet) {
      throw new NotFoundException(
        `Wallet with ${model.id} ID could not found.`,
      );
    }

    return updatedWallet;
  }

  async updateBalance(model: CreateTransactionModel): Promise<WalletModel> {
    const user = await this.userService.getUserById(model.userId);

    if (!user) {
      throw new NotFoundException(
        `User with ${model.userId} ID number could not found.`,
      );
    }

    const wallet = await this.walletRepositoryService.findById(
      model.userId,
      model.walletId,
    );

    if (!wallet) {
      throw new NotFoundException(
        `Wallet with ${model.walletId} ID number could not found.`,
      );
    }

    const updatedBalance =
      await this.walletRepositoryService.updateBalance(model);

    if (!updatedBalance) {
      throw new NotFoundException(
        `User with ${model.userId} ID number or wallet with ${model.walletId} ID number could not found.`,
      );
    }

    return updatedBalance;
  }

  async deleteWallet(userId: string, id: string): Promise<WalletModel> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException(
        `User with ${userId} ID number could not found.`,
      );
    }

    const deletedWallet = await this.walletRepositoryService.delete(id);

    if (!deletedWallet) {
      throw new NotFoundException(`Wallet with ${id} ID could not found.`);
    }

    return deletedWallet;
  }
}
