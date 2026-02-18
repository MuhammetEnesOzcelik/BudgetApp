import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TransactionType } from 'src/domain/transaction/enum/transaction.enum';
import { CategoryModel } from 'src/domain/category/model/category.model';
import { Base } from 'src/common/entity/index';
import { User } from 'src/domain/user/repository/entity/user.entity';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category extends Base {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, enum: TransactionType })
  type: TransactionType;

  @Prop({ type: String, required: true, default: '#000' })
  colour: string;

  static toModel(doc: Category): CategoryModel {
    const model = new CategoryModel();

    model.userId = doc.userId.toString();
    model.name = doc.name;
    model.type = doc.type;
    model.colour = doc.colour;

    model.createdAt = doc.createdAt;
    model.updatedAt = doc.updatedAt;

    return model;
  }
}

export const CategoryEntity = SchemaFactory.createForClass(Category);
