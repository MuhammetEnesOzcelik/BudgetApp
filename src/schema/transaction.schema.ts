import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TransactionType } from 'src/enum/transaction_type.enum';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
    @Prop({ required: true })
    walletId: string;

    @Prop({ required: true, enum: TransactionType })
    type: TransactionType;

    @Prop({ required: true })
    amount: number;

    @Prop()
    description?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);