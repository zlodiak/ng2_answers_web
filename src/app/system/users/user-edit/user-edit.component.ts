import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { InfoDialogComponent } from '../../../shared/dialogs/info-dialog/info-dialog.component';

import { GlobalVarsService } from '../../../shared/services/global-vars.service';
import { User } from '../../../shared/interfaces/user';
import { UsersService } from '../../../shared/services/users.service';


@Component({
  selector: 'aw-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  private form: FormGroup;
  private authUser: User;
  private iconBase64: string;

  constructor(private globalVarsService: GlobalVarsService,
              private router: Router,
              private matDialog: MatDialog,
              private usersService: UsersService) { }

  ngOnInit() {
    this.authUser = this.globalVarsService.getVar('authorizedUser');

    this.form = new FormGroup({
      'name': new FormControl(this.authUser.name ? this.authUser.name : '', [Validators.required]),
      'city': new FormControl(this.authUser.city ? this.authUser.city : ''),
      'info': new FormControl(this.authUser.info ? this.authUser.info : '')
    });
  }

  private onSubmit(): void {
    this.authUser.name = this.form.value.name;
    this.authUser.city = this.form.value.city;
    this.authUser.info = this.form.value.info;
    if(this.iconBase64) { this.authUser.icon = this.iconBase64; }

    this.usersService.setUser(this.authUser.id, this.authUser).subscribe((user) => {
      this.router.navigate(['/user/' + this.authUser.id]);
      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: {title: 'Выполнено', message: 'Данные профиля изменены'}
      });
    });
  }

  private uploadFile(ev): void {
    const file:File = ev.target.files[0];
    const myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.iconBase64 = myReader.result;
      // console.log(this.iconBase64);
    };

    myReader.readAsDataURL(file);
  }

  private deleteImg() {
    this.authUser.icon = undefined;
  }

}
