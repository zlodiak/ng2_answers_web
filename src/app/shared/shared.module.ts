import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatButtonModule,
          MatDialogModule} from '@angular/material';

import { OrderModule } from 'ngx-order-pipe';

import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';

import { DateService } from './services/date.service';
import { GlobalVarsService } from './services/global-vars.service';
import { UsersService } from './services/users.service';

@NgModule({
  exports: [
    OrderModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    InfoDialogComponent
  ],
  entryComponents: [
    InfoDialogComponent
  ],
  providers: [
    UsersService,
    GlobalVarsService,
    DateService
  ]
})
export class SharedModule { }
