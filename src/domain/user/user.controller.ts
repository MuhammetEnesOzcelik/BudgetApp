import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { UserModel } from './model/user.model';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { IdParamValidatorDto, LimitOffsetValidatorDto } from 'src/common/dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user.' })
  @ApiResponse({
    status: 201,
    description: 'User has been succesfully created.',
  })
  async createUser(@Body() dto: CreateUserDto): Promise<UserModel> {
    const createUser = CreateUserDto.toModel(dto);
    return this.userService.createUser(createUser);
  }

  @Get()
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiQuery({ name: 'offset', required: true, type: Number })
  @ApiOperation({ summary: 'Get all users.' })
  @ApiResponse({
    status: 200,
    description: 'All users have been succesfully retrieved.',
  })
  async getUser(@Query() query: LimitOffsetValidatorDto): Promise<UserModel[]> {
    const { limit, offset } = query;
    return this.userService.getUser(limit, offset);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'User has been succesfully retrieved.',
  })
  async getUserById(@Param() { id }: IdParamValidatorDto): Promise<UserModel> {
    return this.userService.getUserById(id);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Update a user.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'User has been succesfully updated.',
  })
  async updatedUser(@Param() { id }: IdParamValidatorDto): Promise<UserModel> {
    return this.userService.updateUser(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'User has been succesfully deleted.',
  })
  async deleteUser(@Param() { id }: IdParamValidatorDto): Promise<UserModel> {
    return this.userService.deleteUser(id);
  }
}
