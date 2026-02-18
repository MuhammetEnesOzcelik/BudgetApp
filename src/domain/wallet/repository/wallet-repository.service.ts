import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './entity/wallet.entity';
import { Model } from 'mongoose';
import { CreateWalletModel } from '../model/crud/create-wallet.model';
import { WalletModel } from '../model/wallet.model';
import { Types } from 'mongoose';
import { CreateTransactionModel } from '../../transaction/model/crud/create-transaction.model';
import { TransactionType } from 'src/domain/transaction/enum/transaction.enum';

@Injectable()
export class WalletRepositoryService {
  constructor(
    @InjectModel(Wallet.name) private readonly walletEntity: Model<Wallet>,
  ) {}

  async create(model: CreateWalletModel): Promise<WalletModel> {
    const userObjId = new Types.ObjectId(model.userId);
    const createdWallet = await this.walletEntity.create({
      userId: userObjId,
      name: model.name,
      balance: model.balance,
      currency: model.currency,
    });
    const wallet = createdWallet;
    return Wallet.toModel(wallet);
  }

  async findAll(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<WalletModel[]> {
    const userObjId = new Types.ObjectId(userId);
    const docs = await this.walletEntity
      .find({ userId: userObjId })
      .skip(offset)
      .limit(limit)
      .exec();
    return docs.map((doc) => Wallet.toModel(doc));
  }

  async findById(userId: string, id: string): Promise<WalletModel | null> {
    const userObjId = new Types.ObjectId(userId);
    const walletObjId = new Types.ObjectId(id);
    const doc = await this.walletEntity
      .findOne({
        _id: walletObjId,
        userId: userObjId,
      })
      .exec();
    return doc ? Wallet.toModel(doc) : null;
  }

  async update(model: CreateWalletModel): Promise<WalletModel | null> {
    const userObjId = new Types.ObjectId(model.userId);
    const walletObjId = new Types.ObjectId(model.id);
    if (Object.keys(model).length === 0) {
      throw new BadRequestException('No fields provided to update.');
    }
    const doc = await this.walletEntity
      .findOneAndUpdate(
        { _id: walletObjId, userId: userObjId },
        { $set: model },
        { new: true },
      )
      .exec();
    return doc ? Wallet.toModel(doc) : null;
  }

  async updateBalance(
    model: CreateTransactionModel,
  ): Promise<WalletModel | null> {
    const userObjId = new Types.ObjectId(model.userId);
    const walletObjId = new Types.ObjectId(model.walletId);
    const doc = await this.walletEntity
      .findOneAndUpdate(
        { _id: walletObjId, userId: userObjId },
        {
          $inc: {
            balance:
              model.type === TransactionType.INCOME
                ? model.amount
                : -model.amount,
          },
        },
        { new: true },
      )
      .exec();
    return doc ? Wallet.toModel(doc) : null;
  }

  async delete(wallet: string): Promise<WalletModel | null> {
    const id = new Types.ObjectId(wallet);
    const doc = await this.walletEntity.findByIdAndDelete(id).exec();
    return doc ? Wallet.toModel(doc) : null;
  }
}
