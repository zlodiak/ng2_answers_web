import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';


import { GlobalVarsService } from '../../../shared/services/global-vars.service';
import { User } from '../../../shared/interfaces/user';
import { AnswersService } from '../../shared/services/answers.service';
import { QuestionsService } from '../../shared/services/questions.service';


@Component({
  selector: 'aw-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  private answerAddNow: boolean;
  private questionId: number;
  private authorizedUser: User;
  private isAnswered: boolean = false;
  private isOwnQuestion: boolean = false;

  private subParams: Subscription;
  private subGetQuestion: Subscription;
  private subGetAnswerByQU: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private globalVarsService: GlobalVarsService,
              private answersService: AnswersService,
              private questionsService: QuestionsService) { }

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();

    this.subParams = Observable.combineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams
    ).subscribe((data: [any, any]) => {
      this.questionId = +data[0]['id'];
      this.answerAddNow = data[1]['answerAddNow'];
      this.checkAnswered();
      this.checkOwnQuestion();
    });
  }

  ngOnDestroy() {
    if(this.subParams) { this.subParams.unsubscribe(); }
    if(this.subGetQuestion) { this.subGetQuestion.unsubscribe(); }
    if(this.subGetAnswerByQU) { this.subGetAnswerByQU.unsubscribe(); }
  }

  private checkOwnQuestion() {
    if(this.authorizedUser) {
      this.questionsService.getQuestion(this.questionId).subscribe((question) => {
        if(question.author === this.authorizedUser.id) {
          this.isOwnQuestion = true;
        }
      });
    }
  }

  private checkAnswered() {
    if(this.authorizedUser) {
      this.subGetAnswerByQU = this.answersService.getAnswerByQU(this.questionId, this.authorizedUser.id).subscribe((answers) => {
        if(answers.length) {
          this.isAnswered = true;
        }
      });
    }
  }

}
