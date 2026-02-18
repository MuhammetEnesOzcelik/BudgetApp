import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class TransactionParamDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  @ApiProperty({ required: true, description: 'ID of the user.' })
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  @ApiProperty({ required: true, description: 'ID of the wallet.' })
  walletId: string;

  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  @ApiProperty({ description: 'ID of the transaction.' })
  id: string;
}
