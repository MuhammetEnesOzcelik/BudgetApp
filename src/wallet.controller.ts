import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateWalletDto, UpdateWalletDto } from './dto/wallet.dto';
import { WalletService } from './wallet.service';
import { Wallet } from './interface/wallet.interface';

@Controller('wallets')
export class WalletController {
    constructor(private walletService: WalletService) { }

    @Post()
    async create(@Body() createWallet: CreateWalletDto): Promise<Wallet> {
        return this.walletService.create(createWallet);
    }

    @Get()
    async findAll(): Promise<Wallet[]> {
        return this.walletService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Wallet | null> {
        return this.walletService.findById(id);
    }

    @Get('by-name/:name')
    async findByName(@Param('name') name: string): Promise<Wallet | null> {
        return this.walletService.findById(name);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateWallet: UpdateWalletDto,
    ): Promise<Wallet | null> {
        return this.walletService.update(id, updateWallet);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Wallet | null> {
        return this.walletService.remove(id);
    }
}