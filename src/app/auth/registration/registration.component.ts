import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../shared/interfaces/user';
import { HashService } from '../../shared/services/hash.service';
import { GlobalVarsService } from '../../shared/services/global-vars.service';
import { UsersService } from '../../shared/services/users.service';


@Component({
  selector: 'aw-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private form: FormGroup;

  constructor(private hashService: HashService,
              private globalVarsService: GlobalVarsService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    const this_ = this;

    this.form = new FormGroup({
      'email':      new FormControl('', [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
      'password':   new FormControl('', [Validators.required, Validators.minLength(6)]),
      'name':       new FormControl('', [Validators.required]),
      'agree':      new FormControl(false, [Validators.requiredTrue])
    });
  }

  private onSubmit(): void {
    console.log(this.form);

    const user: User = {
      id: this.form.value.email,
      password: this.hashService.generate(this.form.value.password),
      name: this.form.value.name
    };

    console.log(user);

    this.usersService.createUser(user).subscribe((resp) => {
      console.log(resp);
      this.router.navigate(['/questions'], {queryParams: {
        authNow: true,
        authId: resp.id,
        authName: resp.name
      }});
    });

    this.globalVarsService.setVar('authorizedUser', user);
  }

  private forbiddenEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserById(control.value).subscribe((user: User) => {
        if(user) {
          resolve({forbiddenEmail: true});
        } else {
          resolve(null);
        }
      });
    });
  }

}
