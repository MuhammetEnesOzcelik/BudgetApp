import { IsString, IsNumber, IsOptional } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class CreateWalletDto {
    @IsString()
    name: string;

    @IsNumber()
    @IsOptional()
    balance?: number;
}

export class UpdateWalletDto extends PartialType(CreateWalletDto) { }