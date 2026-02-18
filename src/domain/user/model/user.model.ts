import { BaseModel } from 'src/common/model';

export class UserModel extends BaseModel {
  name: string;
  email: string;
  password: string;
}
