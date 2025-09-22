import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './entity/wallet.entity';
import { Model } from 'mongoose';
import { CreateWalletModel } from '../model/crud/create-wallet.model';
import { WalletModel } from '../model/wallet.model';
import { UpdateWalletDto } from '../dto/wallet.dto';
import { Types } from 'mongoose';
import { CreateTransactionModel } from '../transaction/model/crud/create-transaction.model';

@Injectable()
export class WalletRepositoryService {
  constructor(
    @InjectModel(Wallet.name) private readonly walletEntity: Model<Wallet>,
  ) {}

  async create(model: CreateWalletModel): Promise<WalletModel> {
    const createdWallet = await this.walletEntity.create({
      name: model.name,
      balance: model.balance,
      currency: model.currency,
    });
    const wallet = createdWallet;
    return Wallet.toModel(wallet);
  }

  async findAll(): Promise<WalletModel[]> {
    const docs = await this.walletEntity.find().exec();
    return docs.map((doc) => Wallet.toModel(doc));
  }

  async findById(id: Types.ObjectId): Promise<WalletModel | null> {
    const doc = await this.walletEntity.findById(id).exec();
    return doc ? Wallet.toModel(doc) : null;
  }

  async update(
    id: Types.ObjectId,
    dto: UpdateWalletDto,
  ): Promise<WalletModel | null> {
    const doc = await this.walletEntity
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    return doc ? Wallet.toModel(doc) : null;
  }

  async updateBalance(
    model: CreateTransactionModel,
  ): Promise<WalletModel | null> {
    const wallet = await this.walletEntity.findById(model.walletId);
    if (!wallet) {
      throw new NotFoundException('Wallet could not found.');
    }
    return this.walletEntity
      .findByIdAndUpdate(
        model.walletId,
        { $inc: { balance: model.amount } },
        { new: true },
      )
      .exec();
  }

  async remove(id: Types.ObjectId): Promise<WalletModel | null> {
    const doc = await this.walletEntity.findByIdAndDelete(id).exec();
    return doc ? Wallet.toModel(doc) : null;
  }
}