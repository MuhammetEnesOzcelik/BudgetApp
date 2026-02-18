import { Controller, Post, Param, Body, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/transaction.dto';
import { TransactionModel } from './model/transaction.model';
import { WalletService } from 'src/domain/wallet/wallet.service';
import { TransactionParamDto } from './dto/transaction-param.dto';
import {
  LimitOffsetValidatorDto,
  UserIDAndIdParamDto,
} from 'src/common/dto/index';

@Controller('users')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly walletService: WalletService,
  ) {}

  @Post(':userId/wallets/:id/transactions')
  @ApiOperation({ summary: 'Create a transaction for the wallet.' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiParam({
    name: 'walletId',
    type: String,
    description: 'ID of the wallet.',
  })
  @ApiResponse({
    status: 201,
    description: 'The transaction for the wallet has been created.',
  })
  async createTransaction(
    @Param() param: UserIDAndIdParamDto,
    @Body() dto: CreateTransactionDto,
  ): Promise<TransactionModel> {
    const createModel = CreateTransactionDto.toModel(
      param.userId,
      param.id,
      dto,
    );
    const transaction =
      await this.transactionService.createTransaction(createModel);
    return transaction;
  }

  @Get(':userId/wallets/:id/transactions')
  @ApiQuery({ name: 'limit', required: true, type: String })
  @ApiQuery({ name: 'offset', required: true, type: String })
  @ApiOperation({ summary: 'Get all transactions.' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiParam({
    name: 'walletId',
    type: String,
    description: 'ID of the wallet.',
  })
  @ApiResponse({
    status: 200,
    description: 'All transactions have been succesfully retrieved.',
  })
  async getTransaction(
    @Param() param: UserIDAndIdParamDto,
    @Query() query: LimitOffsetValidatorDto,
  ): Promise<TransactionModel[]> {
    const { limit, offset } = query;
    return this.transactionService.getTransaction(
      param.userId,
      param.id,
      limit,
      offset,
    );
  }

  @Get(':userId/wallets/:walletId/transactions/:id')
  @ApiOperation({ summary: 'Get transaction by ID.' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user.',
  })
  @ApiParam({
    name: 'walletId',
    type: String,
    description: 'ID of the wallet.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the transaction.',
  })
  @ApiResponse({
    status: 200,
    description: 'The transaction has been succesfully retrieved.',
  })
  async getTransactionById(
    @Param() param: TransactionParamDto,
  ): Promise<TransactionModel | null> {
    return this.transactionService.getTransactionById(
      param.userId,
      param.walletId,
      param.id,
    );
  }
}
