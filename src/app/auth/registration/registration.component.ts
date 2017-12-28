import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../shared/interfaces/user';
import { HashService } from '../../shared/services/hash.service';


@Component({
  selector: 'aw-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private form: FormGroup;

  constructor(private hashService: HashService) { }

  ngOnInit() {
    const this_ = this;

    this.form = new FormGroup({
      'email':      new FormControl('', [Validators.required, Validators.email]),
      'password':   new FormControl('', [Validators.required, Validators.minLength(6)]),
      'name':       new FormControl('', [Validators.required]),
      'agree':      new FormControl(false, [Validators.requiredTrue])
    });
  }

  private onSubmit(): void {
    console.log(this.form);

    const user: User = {
      email: this.form.value.email,
      password: this.hashService.generate(this.form.value.password),
      name: this.form.value.name
    };

    console.log(user);
  }

}
