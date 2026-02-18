import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateWalletDto } from './dto/wallet.dto';
import { WalletModel } from './model/wallet.model';
import { WalletService } from './wallet.service';
import {
  IdParamValidatorDto,
  LimitOffsetValidatorDto,
  UserIDAndIdParamDto,
} from 'src/common/dto/index';

@Controller('users')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post(':id/wallets')
  @ApiOperation({ summary: 'Create a wallet.' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiResponse({
    status: 201,
    description: 'The wallet has been succesfully created.',
  })
  async createWallet(
    @Param() { id }: IdParamValidatorDto,
    @Body() dto: CreateWalletDto,
  ): Promise<WalletModel> {
    const createModel = CreateWalletDto.toModel(id, dto);
    return this.walletService.createWallet(createModel);
  }

  @Get(':id/wallets')
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiQuery({ name: 'query', required: true, type: Number })
  @ApiOperation({ summary: 'Get all wallets.' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'All wallets have been succesfully retrieved.',
  })
  async getWallet(
    @Param() { id }: IdParamValidatorDto,
    @Query() query: LimitOffsetValidatorDto,
  ): Promise<WalletModel[]> {
    const { limit, offset } = query;
    return this.walletService.getWallet(id, limit, offset);
  }

  @Get(':userId/wallets/:id')
  @ApiOperation({ summary: 'Get wallet by ID' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the wallet.',
  })
  @ApiResponse({
    status: 200,
    description: 'The wallet has been succesfully retrieved.',
  })
  async getWalletById(
    @Param() param: UserIDAndIdParamDto,
  ): Promise<WalletModel | null> {
    return this.walletService.getWalletById(param.userId, param.id);
  }

  @Put(':userId/wallets/:id')
  @ApiOperation({ summary: 'Update wallet.' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'Id of the user.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the wallet.',
  })
  @ApiResponse({
    status: 200,
    description: 'The wallet has been succesfully updated.',
  })
  async updateWallet(
    @Param() param: UserIDAndIdParamDto,
    @Body() dto: CreateWalletDto,
  ): Promise<WalletModel | null> {
    const updateModel = CreateWalletDto.toModel(param.userId, dto);
    return this.walletService.updateWallet(updateModel);
  }

  @Delete(':userId/wallets/:id')
  @ApiOperation({ summary: 'Delete wallet.' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the wallet.',
  })
  @ApiResponse({
    status: 200,
    description: 'The wallet has been succesfully deleted.',
  })
  async deleteWallet(
    @Param() param: UserIDAndIdParamDto,
  ): Promise<WalletModel | null> {
    return this.walletService.deleteWallet(param.userId, param.id);
  }
}
