import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../shared/interfaces/user';
import { HashService } from '../../shared/services/hash.service';
import { GlobalVarsService } from '../../shared/services/global-vars.service';
import { UsersService } from '../../shared/services/users.service';


@Component({
  selector: 'aw-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private form: FormGroup;
  private subCreateUser: Subscription;

  constructor(private hashService: HashService,
              private globalVarsService: GlobalVarsService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email':      new FormControl('', [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
      'password':   new FormControl('', [Validators.required, Validators.minLength(6)]),
      'name':       new FormControl('', [Validators.required]),
      'agree':      new FormControl(false, [Validators.requiredTrue])
    });
  }

  ngOnDestroy() {
    if(this.subCreateUser) { this.subCreateUser.unsubscribe(); }
  }

  private onSubmit(): void {
    const user: User = {
      id: this.form.value.email,
      password: this.hashService.generate(this.form.value.password),
      name: this.form.value.name,
      createdDateUnix: '' + (Date.now() / 1000)
    };

    this.subCreateUser = this.usersService.createUser(user).subscribe((resp) => {
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
