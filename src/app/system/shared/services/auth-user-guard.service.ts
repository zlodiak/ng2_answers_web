import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { GlobalVarsService } from '../../../shared/services/global-vars.service';


@Injectable()
export class AuthUserGuardService {

  constructor(private router: Router,
              private globalVarsService: GlobalVarsService) { }

  canActivate() {
    const authorizedUser = this.globalVarsService.getVar('authorizedUser');

    if(!authorizedUser) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
