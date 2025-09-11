import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
    @Prop({ required: true })
    walletId: string;

    @Prop({ required: true })
    walletName: string;

    @Prop({ required: true, default: 0 })
    walletBalance: number;

    @Prop({ required: true, default: '₺' })
    walletCurrency: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);