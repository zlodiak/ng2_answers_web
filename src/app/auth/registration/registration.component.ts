import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'aw-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'email':    new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name':     new FormControl(null, [Validators.required]),
      'agree':    new FormControl(false, [Validators.requiredTrue])
    });
  }

  private onSubmit(): void {

  }

}
