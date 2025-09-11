import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WalletModule } from './wallet.module';
import { TransactionModule } from './transaction.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [WalletModule, TransactionModule, ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
