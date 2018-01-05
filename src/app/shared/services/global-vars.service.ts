import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { User } from '../interfaces/user';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalVarsService {

  private globalVars: Object = {};

  constructor() {}

  getVar(key) {
    return this.globalVars[key];
  }

  setVar(key, value): void {
    this.globalVars[key] = value;
  }

  getAuthorizedUser_(): User {
    return this.globalVars['authorizedUser'];
  }

  getAuthorizedUser(): Observable<User> {
    return Observable.timer(0, 3000).map(() => {
      return this.globalVars['authorizedUser'];
    });
  }

  getLoading(): Observable<any> {
    return Observable.timer(0, 300).map(() => {
      return this.globalVars['isLoading'];
    });
  }

}
