import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GlobalVarsService } from './shared/services/global-vars.service';
import { User } from './shared/interfaces/user';


@Component({
  selector: 'aw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private authorizedUserId: string | boolean;
  private authorizedUserName: string | boolean;
  private subGetAuthorizedUser: Subscription;

  constructor(private globalVarsService: GlobalVarsService,
              private router: Router) {}

  ngOnInit() {
    this.subGetAuthorizedUser = this.globalVarsService.getAuthorizedUser().subscribe(
      (user: User) => {
        this.authorizedUserId = user ? user.id : false;
        this.authorizedUserName = user ? user.name : false;
      }
    );
  }

  ngOnDestroy() {
    if(this.subGetAuthorizedUser) { this.subGetAuthorizedUser.unsubscribe(); }
  }

  private logout(): void {
    this.globalVarsService.setVar('authorizedUser', undefined);
    this.router.navigate(['/questions'], {queryParams: {
      logoutNow: true
    }});
  }

}
