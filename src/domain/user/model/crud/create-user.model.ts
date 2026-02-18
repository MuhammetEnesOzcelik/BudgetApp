import { BaseModel } from 'src/common/model';

export class CreateUserModel extends BaseModel {
  name: string;
  email: string;
  password: string;
}
