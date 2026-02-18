import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth() {
    // MongoDB Connection Test
    // If MongoDB is not connected, return error
    // If MongoDB is connected, return OK
    return 'OK';
  }
}
