import { IsMongoId, IsNotEmpty } from 'class-validator';

export class WalletIdQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  walletId: string;
}