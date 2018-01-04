import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

import { InfoDialogComponent } from './shared/dialogs/info-dialog/info-dialog.component';

import { GlobalVarsService } from './system/shared/services/global-vars.service';
import { User } from './shared/interfaces/user';
import { Config } from './config';


@Component({
  selector: 'aw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private author: string = Config.author;
  private createdDate: string = Config.createdDate;

  private isLoading: boolean = false;
  private isOpen: boolean = false;
  private authorizedUserId: string | boolean;
  private authorizedUserName: string | boolean;

  private subGetAuthorizedUser: Subscription;

  constructor(private matDialog: MatDialog,
              private globalVarsService: GlobalVarsService,
              private router: Router) {}

  ngOnInit() {
    this.subGetAuthorizedUser = this.globalVarsService.getAuthorizedUser().subscribe(
      (user: User) => {
        this.authorizedUserId = user ? user.id : false;
        this.authorizedUserName = user ? user.name : false;
      }
    );

    this.globalVarsService.getLoading().subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    if(this.subGetAuthorizedUser) { this.subGetAuthorizedUser.unsubscribe(); }
  }

  private logout(): void {
    this.globalVarsService.setVar('authorizedUser', undefined);

    this.router.navigate(['/questions'], {queryParams: {
      logoutNow: true
    }});

    this.matDialog.open(InfoDialogComponent, {
      width: '300px',
      hasBackdrop: true,
      data: {title: 'Выполнено', message: 'Ваш вышли из системы'}
    });
  }

  private toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

}
