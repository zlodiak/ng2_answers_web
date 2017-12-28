import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InfoDialogComponent } from '../../shared/dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'aw-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if(params['authNow']) {
        /*this.matDialog.open(InfoDialogComponent, {
          width: '300px',
          hasBackdrop: true,
          data: { title: 'Добро пожаловать', message: 'Регистрация прошла успешно. Сейчас вы авторизованы.' }
        });*/
      }
    });
  }

}
