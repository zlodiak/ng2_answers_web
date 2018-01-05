import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../shared/services/users.service';
import { GlobalVarsService } from '../../../shared/services/global-vars.service';

import { User } from '../../../shared/interfaces/user';


@Component({
  selector: 'aw-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  private userId: string;
  private user: User;
  private authUser: User;

  private subParams: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private globalVarsService: GlobalVarsService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.authUser = this.globalVarsService.getVar('authorizedUser');

    this.subParams = this.activatedRoute.params.subscribe((params) => {
      this.userId = params['user_id'];
      this.getUser();
    });
  }

  ngOnDestroy() {
    if(this.subParams) { this.subParams.unsubscribe(); }
  }

  private getUser(): void {
    this.usersService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
    });
  }

}
