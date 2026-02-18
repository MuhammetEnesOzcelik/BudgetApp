import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './mongo-config.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const mongoConfigService = new MongoConfigService(configService);
        return mongoConfigService.createMongooseOptions();
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class MongoModule {}
