import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Currency } from 'src/enum/currency.enum';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
    @Prop({})
    walletId: string;

    @Prop({ required: true })
    walletName: string;

    @Prop({ required: true, default: 0 })
    walletBalance: number;

    @Prop({ required: true, enum: Currency, default: Currency.TRY })
    walletCurrency: Currency;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);