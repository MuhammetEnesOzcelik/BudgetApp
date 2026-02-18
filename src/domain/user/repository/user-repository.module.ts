import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user-repository.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserEntity } from './entity/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }]),
  ],
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class UserRepositoryModule {}
