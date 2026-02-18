import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from 'src/common/entity';
import { UserModel } from 'src/domain/user/model/user.model';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Base {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  static toModel(doc: User): UserModel {
    const model = new UserModel();

    model.name = doc.name;
    model.email = doc.email;
    model.password = doc.password;

    model.createdAt = doc.createdAt;
    model.updatedAt = doc.updatedAt;

    return model;
  }
}

export const UserEntity = SchemaFactory.createForClass(User);
