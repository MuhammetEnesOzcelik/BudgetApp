import { Module } from '@nestjs/common';
import { WalletModule } from './wallet.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
