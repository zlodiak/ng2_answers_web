import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GlobalVarsService } from '../../../shared/services/global-vars.service';
import { User } from '../../../shared/interfaces/user';
import { AnswersService } from '../../shared/services/answers.service';


@Component({
  selector: 'aw-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  private questionCreateNow: boolean;
  private questionId: number;
  private authorizedUser: User;
  private isAnswered: boolean = false;

  private subQuestionId: Subscription;
  private subQuestionCreateNow: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private globalVarsService: GlobalVarsService,
              private answersService: AnswersService) { }

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();

    this.subQuestionId = this.subQuestionId = this.activatedRoute.params.subscribe(params => {
      this.questionId = +params['id'];
    });

    this.subQuestionCreateNow = this.activatedRoute.queryParams.subscribe(params => {
      this.questionCreateNow = params['questionCreateNow'];
    });

    this.checkAnswered();
  }

  ngOnDestroy() {
    if(this.subQuestionId) { this.subQuestionId.unsubscribe(); }
    if(this.subQuestionCreateNow) { this.subQuestionCreateNow.unsubscribe(); }
  }

  private checkAnswered() {
    console.log(this.questionId);
    console.log(this.authorizedUser);

    if(this.authorizedUser) {
      this.answersService.getAnswerByQU(this.questionId, this.authorizedUser.id).subscribe((answers) => {
        console.log(answers.length);
        if(answers.length) {
          this.isAnswered = true;
        }
      });
    }



  }

}
