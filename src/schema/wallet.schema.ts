import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
    @Prop()
    name: string;

    @Prop()
    balance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);