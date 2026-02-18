import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UserIDAndIdParamDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  @ApiProperty({ required: true, description: 'ID of the user.' })
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  @ApiProperty({ required: true, description: 'ID of the wallet.' })
  id: string;
}
