import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './schema/wallet.schema';
import { Injectable } from '@nestjs/common';
import { CreateWalletDto, UpdateWalletDto } from './dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

  async create(createWallet: CreateWalletDto): Promise<Wallet> {
    const createdWallet = new this.walletModel(createWallet);
    return createdWallet.save();
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletModel.find().exec();
  }

  async findById(id: string): Promise<Wallet | null> {
    return this.walletModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Wallet | null> {
    return this.walletModel.findOne({ name }).exec();
  }

  async update(
    id: string,
    updateWallet: Partial<UpdateWalletDto>,
  ): Promise<Wallet | null> {
    const updatedWallet = await this.walletModel
      .findByIdAndUpdate(id, updateWallet, { new: true })
      .exec();
    return updatedWallet;
  }

  async updateBalance(id: string, amount: number) {
    return this.walletModel
      .findByIdAndUpdate(id, { $inc: { walletBalance: amount } }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Wallet | null> {
    return this.walletModel.findByIdAndDelete(id).exec();
  }
}
