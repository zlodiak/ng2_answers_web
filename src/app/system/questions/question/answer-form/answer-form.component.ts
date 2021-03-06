import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

import { InfoDialogComponent } from '../../../../shared/dialogs/info-dialog/info-dialog.component';

import { Answer } from '../../../shared/interfaces/answer';
import { AnswersService } from '../../../shared/services/answers.service';
import { GlobalVarsService } from '../../../../shared/services/global-vars.service';


@Component({
  selector: 'aw-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerFormComponent implements OnInit, OnDestroy {

  private form: FormGroup;
  private subCreateAnswer: Subscription;

  @Input() questionId: string;

  constructor(private matDialog: MatDialog,
              private router: Router,
              private globalVarsService: GlobalVarsService,
              private answersService: AnswersService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'answer': new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  ngOnDestroy() {
    if(this.subCreateAnswer) { this.subCreateAnswer.unsubscribe(); }
  }

  private onSubmit(): void {
    const authorizedUser = this.globalVarsService.getAuthorizedUser_();

    if(!authorizedUser) { return; }

    // id is autoincrement
    const answer: Answer = {
      createdDateUnix: '' + (Date.now() / 1000),
      author: authorizedUser.id,
      body: this.form.value.answer,
      ratingPlus: [],
      ratingMinus: [],
      isSolution: false,
      questionId: +this.questionId
    };

    this.subCreateAnswer = this.answersService.createAnswer(answer).subscribe((resp) => {
      this.form.patchValue({answer: ''});

      this.router.navigate(['/question/' + +this.questionId], {queryParams: {
        answerAddNow: true
      }});

      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: {title: 'Выполнено', message: 'Ваш ответ добавлен'}
      });
    });
  }

}
