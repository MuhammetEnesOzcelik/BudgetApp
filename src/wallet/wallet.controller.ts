import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateWalletDto, UpdateWalletDto } from './dto/wallet.dto';
import { WalletModel } from './model/wallet.model';
import { WalletService } from './wallet.service';
import { Types } from 'mongoose';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({ summary: 'Create a wallet.' })
  @ApiResponse({
    status: 201,
    description: 'The wallet has been succesfully created.',
  })
  async createWallet(@Body() dto: CreateWalletDto): Promise<WalletModel> {
    const createModel = CreateWalletDto.toModel(dto);
    return this.walletService.createWallet(createModel);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wallets.' })
  @ApiResponse({
    status: 200,
    description: 'All wallets have been succesfully retrieved.',
  })
  async getWallet(): Promise<WalletModel[]> {
    return this.walletService.getWallet();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wallet by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the wallet to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'The wallet has been succesfully retrieved.',
  })
  async getWalletById(
    @Param('id') id: Types.ObjectId,
  ): Promise<WalletModel | null> {
    return this.walletService.getWalletById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update wallet.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the wallet to update.',
  })
  @ApiResponse({
    status: 200,
    description: 'The wallet has been succesfully updated.',
  })
  async updateWallet(
    @Param('id') id: Types.ObjectId,
    @Body() dto: UpdateWalletDto,
  ): Promise<WalletModel | null> {
    return this.walletService.updateWallet(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete wallet.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the wallet to delete.',
  })
  @ApiResponse({
    status: 200,
    description: 'The wallet has been succesfully deleted.',
  })
  async deleteWallet(
    @Param('id') id: Types.ObjectId,
  ): Promise<WalletModel | null> {
    return this.walletService.deleteWallet(id);
  }
}