import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Question } from '../../shared/interfaces/question';
import { QuestionsService } from '../../shared/services/questions.service';
import { GlobalVarsService } from '../../../shared/services/global-vars.service';


@Component({
  selector: 'aw-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent implements OnInit, OnDestroy {

  private form: FormGroup;
  private subCreateQuestion: Subscription;

  constructor(private questionsService: QuestionsService,
              private router: Router,
              private globalVarsService: GlobalVarsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title':      new FormControl('', [Validators.required, Validators.minLength(1)]),
      'question':   new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnDestroy() {
    this.subCreateQuestion.unsubscribe();
  }

  private onSubmit(): void {
    const authorizedUser = this.globalVarsService.getAuthorizedUser_();

    if(!authorizedUser) { return; }

    // id is autoincrement
    const question: Question = {
      author: authorizedUser.id,
      isDecided: false,
      isDeleted: false,
      tags: [],
      title: this.form.value.title,
      body: this.form.value.question,
      ratingPlus: [],
      ratingMinus: [],
      createdDateUnix: '' + Date.now()
    };

    this.subCreateQuestion = this.questionsService.createQuestion(question).subscribe((resp) => {
      this.router.navigate(['/question/' + resp.id], {queryParams: {
        questionCreateNow: true
      }});
    });
  }

}
