import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserModel } from '../model/crud/create-user.model';
import { UserModel } from '../model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectModel(User.name) private readonly userEntity: Model<User>,
  ) {}

  async create(model: CreateUserModel): Promise<UserModel> {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(model.password, salt);

    const user = new this.userEntity({
      name: model.name,
      email: model.email,
      password: hashedPassword,
    });
    const createdUser = await user.save();

    return User.toModel(createdUser);
  }

  async findAll(limit: number, offset: number): Promise<UserModel[]> {
    return this.userEntity.find().skip(offset).limit(limit).exec();
  }

  async findById(id: string): Promise<UserModel | null> {
    const userObjId = new Types.ObjectId(id);
    return this.userEntity.findById(userObjId).exec();
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.userEntity.findOne({ email: email });
  }

  async findOne(username: string): Promise<UserModel | null> {
    return this.userEntity.findOne({ name: username });
  }

  async update(id: string): Promise<UserModel | null> {
    const userObjId = new Types.ObjectId(id);
    return this.userEntity.findByIdAndUpdate(userObjId).exec();
  }

  async delete(id: string): Promise<UserModel | null> {
    const userObjId = new Types.ObjectId(id);
    return this.userEntity.findByIdAndDelete(userObjId).exec();
  }
}
