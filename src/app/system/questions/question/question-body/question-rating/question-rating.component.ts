import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../../../../shared/interfaces/user';
import { Question } from '../../../../shared/interfaces/question';

import { GlobalVarsService } from '../../../../shared/services/global-vars.service';
import { QuestionsService } from '../../../../shared/services/questions.service';

@Component({
  selector: 'aw-question-rating',
  templateUrl: './question-rating.component.html',
  styleUrls: ['./question-rating.component.scss']
})
export class QuestionRatingComponent implements OnInit, OnDestroy {

  private authorizedUser: User;
  private question: Question;
  private ratingPlus: string[] = [];
  private ratingMinus: string[] = [];

  private subUpdateQuestion: Subscription;
  private subGetQuestion: Subscription;

  @Input() questionId: number;

  constructor(private globalVarsService: GlobalVarsService,
              private questionsService: QuestionsService ) {}

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();
    this.calcRating();
  }

  ngOnDestroy() {
    if(this.subGetQuestion) { this.subGetQuestion.unsubscribe(); }
    if(this.subUpdateQuestion) { this.subUpdateQuestion.unsubscribe(); }
  }

  private ratingIncrement(): void {
    if(!this.authorizedUser) { return; }

    const inPlusArray = this.ratingPlus.indexOf(this.authorizedUser.id);

    if(inPlusArray !== -1) {    // уже нажимал
      // удалим id из ratingPlus
      this.ratingPlus.splice(inPlusArray, 1);
    } else {    // ещё не нажимал
      // добавим id в ratingPlus
      this.question.ratingPlus.push(this.authorizedUser.id);

      // удалим id из ratingMinus
      const inMinusArray = this.ratingMinus.indexOf(this.authorizedUser.id);
      if(inMinusArray !== -1) {
        this.ratingMinus.splice(inMinusArray, 1);
      }
    }

    this.subUpdateQuestion = this.questionsService.updateQuestion(this.questionId, this.question).subscribe(() => {
      this.calcRating();
    });
  }

  private ratingDecrement(): void {
    if(!this.authorizedUser) { return; }

    const inMinusArray = this.ratingMinus.indexOf(this.authorizedUser.id);

    if(inMinusArray !== -1) {    // уже нажимал
      // удалим id из ratingMinus
      this.ratingMinus.splice(inMinusArray, 1);
    } else {    // ещё не нажимал
      // добавим id в ratingMinus
      this.question.ratingMinus.push(this.authorizedUser.id);

      // удалим id из ratingPlus
      const inPlusArray = this.ratingPlus.indexOf(this.authorizedUser.id);
      if(inPlusArray !== -1){
        this.ratingPlus.splice(inPlusArray, 1);
      }
    }

    this.subUpdateQuestion = this.questionsService.updateQuestion(this.questionId, this.question).subscribe(() => {
      this.calcRating();
    });
  }

  private calcRating(): void {
    this.subGetQuestion = this.questionsService.getQuestion(this.questionId).subscribe((question) => {
      this.question = question;
      this.ratingPlus = question.ratingPlus;
      this.ratingMinus = question.ratingMinus;
    });
  }

}
