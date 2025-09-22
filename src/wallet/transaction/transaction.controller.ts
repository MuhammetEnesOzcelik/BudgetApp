import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/transaction.dto';
import { TransactionModel } from './model/transaction.model';
import { TransactionType } from './enum/transaction.enum';
import { WalletService } from 'src/wallet/wallet.service';
import { WalletIdQueryDto } from './dto/wallet-id-query.dto';

@Controller('wallets')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly walletService: WalletService,
  ) {}

  @Post(':walletId/transactions')
  @ApiOperation({ summary: 'Create a transaction for the wallet.' })
  @ApiParam({
    name: 'walletId',
    type: String,
    description: 'The ID of the wallet to make transaction.',
  })
  @ApiResponse({
    status: 201,
    description: 'The transaction for the wallet has been created.',
  })
  async createTransaction(
    @Param() { walletId }: WalletIdQueryDto,
    @Body() dto: CreateTransactionDto,
  ): Promise<TransactionModel> {
    const createModel = CreateTransactionDto.toModel(dto, walletId);
    const transaction =
      await this.transactionService.createTransaction(createModel);
    if (transaction.type === TransactionType.INCOME) {
      await this.walletService.updateBalance(createModel);
    } else if (transaction.type === TransactionType.EXPENSE) {
      const negativeCreateModel = createModel;
      negativeCreateModel.amount = -createModel.amount;
      await this.walletService.updateBalance(negativeCreateModel);
    }

    return transaction;
  }

  /*@Get()
  @ApiOperation({ summary: 'Get all transactions.' })
  @ApiResponse({
    status: 200,
    description: 'All transactions have been succesfully retrieved.',
  })
  async getTransaction(@Param('id') id: string): Promise<TransactionModel[]> {
    return this.transactionService.getTransaction(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the transaction to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'The transaction has been succesfully retrieved.',
  })
  async getTransactionById(
    @Param('id') id: string,
  ): Promise<TransactionModel | null> {
    return this.transactionService.getTransactionById(id);
  }*/
}