import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryModel } from './model/category.model';
import { CreateCategoryDto } from './dto/category.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  IdParamValidatorDto,
  LimitOffsetValidatorDto,
  UserIDAndIdParamDto,
} from 'src/common/dto/index';

@Controller('users')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post(':id/categories')
  @ApiOperation({ summary: 'Create a category.' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiResponse({
    status: 201,
    description: 'The category has been succesfully created.',
  })
  async createCategory(
    @Param() { id }: IdParamValidatorDto,
    @Body() dto: CreateCategoryDto,
  ): Promise<CategoryModel> {
    const createModel = CreateCategoryDto.toModel(id, dto);
    return this.categoryService.createCategory(createModel);
  }

  @Get(':id/categories')
  @ApiQuery({ name: 'limit', required: true, type: String })
  @ApiQuery({ name: 'offset', required: true, type: String })
  @ApiOperation({ summary: 'Get all categories.' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'All categories have been succesfully received.',
  })
  async getCategory(
    @Param() { id }: IdParamValidatorDto,
    @Query() query: LimitOffsetValidatorDto,
  ): Promise<CategoryModel[]> {
    const { limit, offset } = query;
    return this.categoryService.getCategory(id, limit, offset);
  }

  @Get(':userId/categories/:id')
  @ApiOperation({ summary: 'Get category by ID.' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the category.',
  })
  @ApiResponse({
    status: 200,
    description: 'The category has been succesfully received.',
  })
  async getCategoryById(
    @Param() param: UserIDAndIdParamDto,
  ): Promise<CategoryModel | null> {
    return this.categoryService.getCategoryById(param.userId, param.id);
  }

  @Put(':userId/categories/:id')
  @ApiOperation({ summary: 'Update the category.' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the category.',
  })
  @ApiResponse({
    status: 200,
    description: 'The category has been succesfully updated.',
  })
  async updateCategory(
    @Param() param: UserIDAndIdParamDto,
    @Body() dto: CreateCategoryDto,
  ): Promise<CategoryModel | null> {
    const model = CreateCategoryDto.toModel(param.userId, dto);
    return this.categoryService.updateCategory(model);
  }

  /*@Put()
  @ApiOperation({ summary: 'Upsert a category.' })
  async upsertCategory(@Body() dto: CreateCategoryDto) {
    const upsertModel = CreateCategoryDto.toModel(dto);
    return this.categoryService.upsertCategory(upsertModel);
  }*/

  @Delete(':userId/categories/:id')
  @ApiOperation({ summary: 'Delete the category' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the category.',
  })
  @ApiResponse({
    status: 200,
    description: 'The category has benn succesfullt deleted.',
  })
  async deleteCategory(
    @Param() param: UserIDAndIdParamDto,
  ): Promise<CategoryModel | null> {
    return this.categoryService.deleteCategory(param.userId, param.id);
  }
}
