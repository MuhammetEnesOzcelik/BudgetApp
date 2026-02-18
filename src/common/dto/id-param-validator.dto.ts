import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class IdParamValidatorDto {
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, description: 'ID parameter in the endpoint.' })
  id: string;
}
