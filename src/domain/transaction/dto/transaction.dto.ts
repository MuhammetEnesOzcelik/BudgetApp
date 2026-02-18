import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTransactionModel } from '../model/crud/create-transaction.model';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../enum/transaction.enum';
import { Transform, Type } from 'class-transformer';
import { CreateCategoryDto } from 'src/domain/category/dto/category.dto';
import { getCurrentTimeInSec, getTimeInSec } from 'src/common/util/time';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, description: 'Amount of the transaction.' })
  amount: number;

  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value?.toUpperCase())
  @IsEnum(TransactionType)
  @ApiProperty({ required: true, description: 'Type of the transaction.' })
  type: TransactionType;

  @IsOptional()
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'ID of the category which is selectable in transaction.',
  })
  categoryId?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateCategoryDto)
  @IsOptional()
  @ApiProperty({
    description: 'Category which client will create for the transaction.',
    type: CreateCategoryDto,
  })
  createCategory?: CreateCategoryDto;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }: { value: number }) => getTimeInSec(value))
  @ApiProperty({ description: 'Date of the transaction.' })
  date?: number;

  @IsOptional()
  @ApiProperty({
    description: 'Description of the transaction.',
  })
  description?: string;

  static toModel(
    userId: string,
    walletId: string,
    dto: CreateTransactionDto,
  ): CreateTransactionModel {
    const model = new CreateTransactionModel();

    model.userId = userId;
    model.walletId = walletId;
    model.amount = dto.amount;
    model.type = dto.type;
    model.categoryId = dto.categoryId;

    model.date = dto.date ? dto.date : getCurrentTimeInSec();
    model.description = dto.description;

    if (dto.createCategory) {
      model.createCategory = CreateCategoryDto.toModel(
        model.userId,
        dto.createCategory,
      );
    }
    return model;
  }
}
