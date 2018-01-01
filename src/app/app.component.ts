import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVarsService } from './shared/services/global-vars.service';
import { User } from './shared/interfaces/user';


@Component({
  selector: 'aw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  private authorizedUserId: string | boolean;
  private authorizedUserName: string | boolean;

  constructor(private globalVarsService: GlobalVarsService,
              private router: Router) {}

  ngOnInit() {
    this.globalVarsService.getAuthorizedUser().subscribe(
      (user: User) => {
        this.authorizedUserId = user ? user.id : false;
        this.authorizedUserName = user ? user.name : false;
        // console.log('authorizedUser', this.authorizedUserId, this.authorizedUserName);
      }
    );
  }

  private logout(): void{
    this.globalVarsService.setVar('authorizedUser', undefined);
    this.router.navigate(['/questions'], {queryParams: {
      logoutNow: true
    }});
  }

}
