import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { APPLICATION_ENVIRONMENT } from 'src/common/enum';
import { IMongoDB } from 'src/config';

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  private readonly logger = new Logger(MongoConfigService.name);

  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const mongoDbConfig = this.configService.get<IMongoDB>('mongoDb');
    console.log('=========');
    console.log(mongoDbConfig);
    const appEnv = this.configService.get<string>('appEnv');

    return {
      ...mongoDbConfig,
      autoIndex: appEnv === APPLICATION_ENVIRONMENT.DEV,
      connectionFactory: (conn: mongoose.Connection) => {
        return conn;
      },
    };
  }
}
