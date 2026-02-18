import { Module } from '@nestjs/common';
import { CategoryRepositoryModule } from './repository/category-repository.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { UserModule } from 'src/domain/user/user.module';

@Module({
  imports: [CategoryRepositoryModule, UserModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
