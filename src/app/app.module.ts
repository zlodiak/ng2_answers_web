import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { HashService } from './shared/services/hash.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    SystemModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [HashService],
  bootstrap: [AppComponent]
})
export class AppModule { }
