import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Base } from 'src/common/entity/index';
import { Currency } from 'src/common/enum/index';
import { User } from 'src/domain/user/repository/entity/user.entity';
import { WalletModel } from 'src/domain/wallet/model/wallet.model';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet extends Base {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true, default: 0 })
  balance: number;

  @Prop({ type: String, enum: Currency, required: true, default: Currency.TRY })
  currency: Currency;

  static toModel(doc: Wallet): WalletModel {
    const model = new WalletModel();

    model.userId = doc.userId.toString();
    model.name = doc.name;
    model.balance = doc.balance;
    model.currency = doc.currency;

    model.createdAt = doc.createdAt;
    model.updatedAt = doc.updatedAt;

    return model;
  }
}

export const WalletEntity = SchemaFactory.createForClass(Wallet);
