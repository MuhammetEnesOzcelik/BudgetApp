import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryModel } from './model/category.model';
import { CreateCategoryModel } from './model/crud/create-category.model';
import { CategoryRepositoryService } from './repository/category-repository.service';
import { UserService } from 'src/domain/user/user.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepositoryService: CategoryRepositoryService,
    private readonly userService: UserService,
  ) {}

  async createCategory(model: CreateCategoryModel): Promise<CategoryModel> {
    const user = await this.userService.getUserById(model.userId);

    if (!user) {
      throw new NotFoundException(
        `User with ${model.userId} ID number could not found.`,
      );
    }

    return this.categoryRepositoryService.create(model);
  }

  async getCategory(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<CategoryModel[]> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException(
        `User with ${userId} ID number could not found.`,
      );
    }

    return this.categoryRepositoryService.findAll(userId, limit, offset);
  }

  async getCategoryById(userId: string, id: string): Promise<CategoryModel> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException(
        `User with ${userId} ID number could not found.`,
      );
    }

    const category = await this.categoryRepositoryService.findById(userId, id);

    if (!category) {
      throw new NotFoundException(`Category with ${id} ID could not found.`);
    }

    return category;
  }

  async updateCategory(model: CreateCategoryModel): Promise<CategoryModel> {
    const user = await this.userService.getUserById(model.userId);

    if (!user) {
      throw new NotFoundException(
        `User with ${model.userId} ID number could not found.`,
      );
    }

    const updatedCategory = await this.categoryRepositoryService.update(model);

    if (!updatedCategory) {
      throw new NotFoundException(
        `Category with ${model.id} ID could not found.`,
      );
    }

    return updatedCategory;
  }

  async upsertCategory(model: CreateCategoryModel): Promise<CategoryModel> {
    return this.categoryRepositoryService.upsert(model);
  }

  async deleteCategory(userId: string, id: string): Promise<CategoryModel> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException(
        `User with ${userId} ID number could not found.`,
      );
    }

    const deletedCategory = await this.categoryRepositoryService.delete(
      userId,
      id,
    );
    if (!deletedCategory) {
      throw new NotFoundException(
        `Category with ${id} ID number could not found.`,
      );
    }

    return deletedCategory;
  }
}
