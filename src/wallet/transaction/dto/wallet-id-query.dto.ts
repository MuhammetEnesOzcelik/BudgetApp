import { IsMongoId, IsNotEmpty } from '@nestjs/class-validator';

export class WalletIdQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  walletId: string;
}
