import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { HashService } from '../shared/services/hash.service';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
	imports: [
		SharedModule,
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
		AuthRoutingModule
	],
	declarations: [
		RegistrationComponent,
		LoginComponent,
		AuthComponent
	],
	providers: [
		HashService
	]
})
export class AuthModule{}