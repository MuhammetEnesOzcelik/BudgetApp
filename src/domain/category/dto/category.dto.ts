import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TransactionType } from 'src/domain/transaction/enum/transaction.enum';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryModel } from '../model/crud/create-category.model';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @Transform(({ value }: { value: string }) => value.toUpperCase())
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'Name of the category.' })
  name: string;

  @Transform(({ value }: { value: string }) => value?.toUpperCase())
  @IsEnum(TransactionType)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Transaction type of the category.',
  })
  type: TransactionType;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Colour of the category.' })
  colour?: string;

  static toModel(userId: string, dto: CreateCategoryDto): CreateCategoryModel {
    const model = new CreateCategoryModel();

    model.userId = userId;
    model.name = dto.name;
    model.type = dto.type;
    model.colour = dto.colour;

    return model;
  }
}
