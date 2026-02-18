import { Module } from '@nestjs/common';
import { CategoryRepositoryService } from './category-repository.service';
import { Category, CategoryEntity } from './entity/category.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategoryEntity },
    ]),
  ],
  providers: [CategoryRepositoryService],
  exports: [CategoryRepositoryService],
})
export class CategoryRepositoryModule {}
