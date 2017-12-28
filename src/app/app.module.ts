import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';

import { GlobalVarsService } from './shared/services/global-vars.service';
import { UsersService } from './shared/services/users.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    SystemModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    GlobalVarsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
