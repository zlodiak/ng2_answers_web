import { NgModule } from '@angular/core';
import {  MatButtonModule,
          MatDialogModule} from '@angular/material';

import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';

@NgModule({
  exports: [
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
