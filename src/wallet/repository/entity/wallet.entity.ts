import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Currency } from 'src/wallet/enum/currency.enum';
import { WalletModel } from 'src/wallet/model/wallet.model';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
  @Prop({ type: String, required: true, default: 'User Wallet' })
  name: string;

  @Prop({ type: Number, required: true, default: 0 })
  balance: number;

  @Prop({ type: String, enum: Currency, required: true, default: Currency.TRY })
  currency: Currency;

  static toModel(doc: Wallet): WalletModel {
    const model = new WalletModel();

    model.name = doc.name;
    model.balance = doc.balance;
    model.currency = doc.currency;

    return model;
  }
}

export const WalletEntity = SchemaFactory.createForClass(Wallet);
