import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserModel } from '../model/crud/create-user.model';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, description: 'Name of the user.' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true, description: 'Email of the user.' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ required: true, description: 'Password of the user.' })
  password: string;

  static toModel(dto: CreateUserDto): CreateUserModel {
    const model = new CreateUserModel();

    model.name = dto.name;
    model.email = dto.email;
    model.password = dto.password;

    return model;
  }
}
