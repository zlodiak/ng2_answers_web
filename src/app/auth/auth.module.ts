import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import {AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
	imports: [
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

	]
})
export class AuthModule{}