import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    findOne(username:string):string{
      if(username==='huiruo'){
          return 'I am here';
      }
      return 'Who U find?';
  }
}
