import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';
import { WalletService } from './wallet.service';
import { TransactionType } from './enum/transaction.enum';
import { Transaction } from './interface/transaction.interface';

@Controller('transactions')
export class TransactionController {
    constructor(private walletService: WalletService, private transactionService: TransactionService) { }

    @Post()
    async addTransaction(@Body() addTransaction: TransactionDto): Promise<Transaction> {
        const transaction = await this.transactionService.create(addTransaction);

        if (addTransaction.type === TransactionType.INCOME) {
            await this.walletService.updateBalance(addTransaction.walletId, addTransaction.amount);
        } else if (addTransaction.type === TransactionType.EXPENSE) {
            await this.walletService.updateBalance(addTransaction.walletId, -addTransaction.amount)
        }

        return transaction;
    }

    @Get()
    async findAll(): Promise<Transaction[]> {
        return this.transactionService.findAll();
    }

    @Get(":id")
    async findById(@Param('id') id: string): Promise<Transaction | null> {
        return this.transactionService.findById(id);
    }
}