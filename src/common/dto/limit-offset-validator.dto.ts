import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class LimitOffsetValidatorDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Max(10)
  @Min(1)
  @ApiProperty({
    description: 'Limit of how many document will show.',
    maximum: 10,
    minimum: 1,
    required: true,
  })
  limit: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @ApiProperty({
    description: 'Offset of how many document will skip',
    minimum: 0,
    required: true,
  })
  offset: number;
}
