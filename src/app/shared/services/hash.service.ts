import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Md5 } from 'ts-md5/dist/md5';


@Injectable()
export class HashService {

  constructor() { }

  generate(str): any{
    return Md5.hashStr(str);
  }

  /*compare(str1, str2): boolean{
    const hashStr1 = Md5.hashStr(str1);
    const hashStr2 = Md5.hashStr(str2);
    return hashStr1 === hashStr2;
  }*/

}