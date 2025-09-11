import { Controller, Post, Body } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';
import { WalletService } from './wallet.service';
import { TransactionType } from './enum/transaction_type.enum';

@Controller('transactions')
export class TransactionController {
    constructor(private walletService: WalletService, private transactionService: TransactionService) { }

    @Post()
    async addTransaction(@Body() transactionDto: TransactionDto) {
        const transaction = await this.transactionService.create(transactionDto);

        if (transactionDto.type === TransactionType.INCOME) {
            await this.walletService.updateBalance(transactionDto.walletId, transactionDto.amount);
        } else if (transactionDto.type === TransactionType.EXPENSE) {
            await this.walletService.updateBalance(transactionDto.walletId, -transactionDto.amount)
        }
    }
}