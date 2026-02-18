import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getCurrentTimeInSec } from '../util/time';

@Schema()
export class Base extends Document {
  @Prop({
    type: Number,
    default: getCurrentTimeInSec,
  })
  createdAt: number;

  @Prop({
    type: Number,
    default: getCurrentTimeInSec,
  })
  updatedAt: number;
}

export const BaseEntity = SchemaFactory.createForClass(Base);
