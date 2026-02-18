import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './entity/category.entity';
import { CreateCategoryModel } from '../model/crud/create-category.model';
import { CategoryModel } from '../model/category.model';
import { Types } from 'mongoose';

@Injectable()
export class CategoryRepositoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryEntity: Model<Category>,
  ) {}

  async create(model: CreateCategoryModel): Promise<CategoryModel> {
    const userObjId = new Types.ObjectId(model.userId);
    const createdCategory = await this.categoryEntity.create({
      userId: userObjId,
      name: model.name,
      type: model.type,
      colour: model.colour,
    });
    return Category.toModel(createdCategory);
  }

  async findAll(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<CategoryModel[]> {
    const userObjId = new Types.ObjectId(userId);
    const docs = await this.categoryEntity
      .find({ userId: userObjId })
      .skip(offset)
      .limit(limit)
      .exec();
    return docs.map((doc) => Category.toModel(doc));
  }

  async findById(userId: string, id: string): Promise<CategoryModel | null> {
    const userObjId = new Types.ObjectId(userId);
    const categoryObjId = new Types.ObjectId(id);
    const doc = await this.categoryEntity
      .findOne({ _id: categoryObjId, userId: userObjId })
      .exec();
    return doc ? Category.toModel(doc) : null;
  }

  async update(model: CreateCategoryModel): Promise<CategoryModel | null> {
    const userObjId = new Types.ObjectId(model.userId);
    const categoryObjId = new Types.ObjectId(model.id);
    const doc = await this.categoryEntity.findOneAndUpdate(
      { _id: categoryObjId, userId: userObjId },
      { $set: model },
      { new: true },
    );
    return doc ? Category.toModel(doc) : null;
  }

  async upsert(model: CreateCategoryModel): Promise<CategoryModel> {
    const userObjId = new Types.ObjectId(model.userId);
    const doc = await this.categoryEntity
      .findOneAndUpdate(
        { userId: userObjId, name: model.name, type: model.type },
        { $set: model },
        { new: true },
      )
      .exec();

    if (!doc) {
      const userObjId = new Types.ObjectId(model.userId);
      const createCategory = await this.categoryEntity.create({
        userId: userObjId,
        name: model.name,
        type: model.type,
        colour: model.colour,
      });

      return Category.toModel(createCategory);
    }
    return Category.toModel(doc);
  }

  async delete(userId: string, id: string): Promise<CategoryModel | null> {
    const userObjId = new Types.ObjectId(userId);
    const categoryObjId = new Types.ObjectId(id);
    const doc = await this.categoryEntity
      .findOneAndDelete({ _id: categoryObjId, userId: userObjId })
      .exec();
    return doc ? Category.toModel(doc) : null;
  }
}
