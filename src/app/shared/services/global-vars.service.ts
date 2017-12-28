import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
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

  getAuthorizedUser(): Observable<any> {
    return Observable.interval(1000).map(() => {
      return this.globalVars['authorizedUser'];
    });
  }

}
