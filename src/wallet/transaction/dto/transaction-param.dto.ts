import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class TransactionParamsDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  walletId: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
