import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatButtonModule,
          MatDialogModule} from '@angular/material';

import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';

@NgModule({
  exports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    InfoDialogComponent
  ],
  entryComponents: [
    InfoDialogComponent
  ]
})
export class SharedModule { }
