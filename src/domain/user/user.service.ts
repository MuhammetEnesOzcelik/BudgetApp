import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryService } from './repository/user-repository.service';
import { CreateUserModel } from './model/crud/create-user.model';
import { UserModel } from './model/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  async createUser(model: CreateUserModel): Promise<UserModel> {
    return this.userRepositoryService.create(model);
  }

  async getUser(limit: number, offset: number): Promise<UserModel[]> {
    return this.userRepositoryService.findAll(limit, offset);
  }

  async getUserById(id: string): Promise<UserModel> {
    const user = await this.userRepositoryService.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ${id} ID number could not found.`);
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    const user = await this.userRepositoryService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with ${email} email could not found.`);
    }

    return user;
  }

  async findOne(username: string): Promise<UserModel> {
    const user = await this.userRepositoryService.findOne(username);

    if (!user) {
      throw new NotFoundException(
        `User with ${username} user name could not found.`,
      );
    }

    return user;
  }

  async updateUser(id: string): Promise<UserModel> {
    const updatedUser = await this.userRepositoryService.update(id);

    if (!updatedUser) {
      throw new NotFoundException(`User with ${id} ID number could not found.`);
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<UserModel> {
    const deletedUser = await this.userRepositoryService.delete(id);

    if (!deletedUser) {
      throw new NotFoundException(`User with ${id} ID number could not found.`);
    }

    return deletedUser;
  }
}
