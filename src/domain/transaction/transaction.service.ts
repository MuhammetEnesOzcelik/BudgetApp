import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionModel } from './model/crud/create-transaction.model';
import { TransactionRepositoryService } from './repository/transaction-repository.service';
import { TransactionModel } from './model/transaction.model';
import { WalletService } from '../wallet/wallet.service';
import { CategoryService } from 'src/domain/category/category.service';
import { UserService } from 'src/domain/user/user.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepositoryService: TransactionRepositoryService,
    private readonly categoryService: CategoryService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
  ) {}
  async createTransaction(
    model: CreateTransactionModel,
  ): Promise<TransactionModel> {
    const user = await this.userService.getUserById(model.userId);
    const wallet = await this.walletService.getWalletById(
      model.userId,
      model.walletId,
    );

    if (!user) {
      throw new NotFoundException(
        `User with ${model.userId} ID number could not found. `,
      );
    }

    if (!wallet) {
      throw new NotFoundException(
        `Wallet with ${model.walletId} ID number could not found.`,
      );
    }

    if (model.categoryId && model.createCategory) {
      throw new BadRequestException(
        'CategoryID and CreateCategory fields cannot provide together.',
      );
    } else if (!model.categoryId && !model.createCategory) {
      throw new BadRequestException(
        'Either CategoryID or CreateCategory fields must be provided.',
      );
    }

    if (model.createCategory) {
      const createdCategory = await this.categoryService.upsertCategory(
        model.createCategory,
      );
      delete model.createCategory;
      model.categoryId = createdCategory.id;
    }

    await this.walletService.updateBalance(model);
    return this.transactionRepositoryService.create(model);
    /*if (model.categoryId && model.createCategory) {
      throw new BadRequestException(
        'CategoryId & CreateCategory fields cannot provide together.',
      );
    }

    if (model.createCategory) {
      const createdCategory = await this.categoryService.upsertCategory(
        model.createCategory,
      );

      delete model.createCategory;
      model.categoryId = createdCategory.id;
    }
    const transaction = await this.transactionRepositoryService.create(model);

    await this.walletService.updateBalance(model);

    return transaction;*/
  }

  async getTransaction(
    userId: string,
    walletId: string,
    limit: number,
    offset: number,
  ): Promise<TransactionModel[]> {
    const user = await this.userService.getUserById(userId);
    const wallet = await this.walletService.getWalletById(userId, walletId);
    if (!user) {
      throw new NotFoundException(
        `User with ${userId} ID number could not found.`,
      );
    }
    if (!wallet) {
      throw new NotFoundException(
        `Wallet with ${walletId} ID number could not found.`,
      );
    }
    return this.transactionRepositoryService.findAll(
      userId,
      walletId,
      limit,
      offset,
    );
  }
  async getTransactionById(
    userId: string,
    walletId: string,
    id: string,
  ): Promise<TransactionModel> {
    const user = await this.userService.getUserById(userId);
    const wallet = await this.walletService.getWalletById(userId, walletId);

    if (!user) {
      throw new NotFoundException(
        `User with ${userId} ID number could not found.`,
      );
    }

    if (!wallet) {
      throw new NotFoundException(
        `Wallet with ${walletId} ID number could not found.`,
      );
    }

    const transaction = await this.transactionRepositoryService.findById(
      userId,
      walletId,
      id,
    );

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with ${id} ID number could not found.`,
      );
    }

    return transaction;
  }
}
