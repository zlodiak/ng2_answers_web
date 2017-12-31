import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { DropMenuDirective } from './directives/drop-menu.directive';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    DropMenuDirective,
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AuthModule,
    SystemModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
