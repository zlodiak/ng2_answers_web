import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { GlobalVarsService } from '../../shared/services/global-vars.service';


@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;

  constructor(private usersService: UsersService,
              private globalVarsService: GlobalVarsService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private onSubmit(): void {
    // console.log(this.form);

    this.usersService.isValidPassword(this.form.value.email, this.form.value.password).then((resp) => {
      if(resp) {
        this.usersService.getUserById(this.form.value.email).subscribe((user) => {
          this.globalVarsService.setVar('authorizedUser', user);
          this.router.navigate(['/questions'], {queryParams: {
            authNow: true,
            authId: user.id,
            authName: user.name
          }});
        });
      } else {
        console.log('auth is failed');
      }
    });
  }

}
