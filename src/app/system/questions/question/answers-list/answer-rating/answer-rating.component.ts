import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Answer } from '../../../../shared/interfaces/answer';
import { User } from '../../../../../shared/interfaces/user';

import { GlobalVarsService } from '../../../../shared/services/global-vars.service';
import { AnswersService } from '../../../../shared/services/answers.service';

@Component({
  selector: 'aw-answer-rating',
  templateUrl: './answer-rating.component.html',
  styleUrls: ['./answer-rating.component.scss']
})
export class AnswerRatingComponent implements OnInit, OnDestroy {

  private authorizedUser: User;
  private answer: Answer;
  private ratingPlus: string[] = [];
  private ratingMinus: string[] = [];

  private subUpdateAnswer: Subscription;
  private subGetAnswer: Subscription;

  @Input() answerId: number;
  @Input() questionId: number;
  @Input() questionAuthor: string;

  @Output() refreshAnswers = new EventEmitter<true>();

  constructor(private globalVarsService: GlobalVarsService,
              private answersService: AnswersService) { }

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();
    this.calcRating();
  }

  ngOnDestroy() {
    if(this.subUpdateAnswer) { this.subUpdateAnswer.unsubscribe(); }
    if(this.subGetAnswer) { this.subGetAnswer.unsubscribe(); }
  }

  private ratingIncrement(): void {
    if(!this.authorizedUser) { return; }

    const inPlusArray = this.ratingPlus.indexOf(this.authorizedUser.id);

    if(inPlusArray !== -1) {    // уже нажимал
      // удалим id из ratingPlus
      this.ratingPlus.splice(inPlusArray, 1);
    } else {    // ещё не нажимал
      // добавим id в ratingPlus
      this.answer.ratingPlus.push(this.authorizedUser.id);

      // удалим id из ratingMinus
      const inMinusArray = this.ratingMinus.indexOf(this.authorizedUser.id);
      if(inMinusArray !== -1) {
        this.ratingMinus.splice(inMinusArray, 1);
      }
    }

    this.subUpdateAnswer = this.answersService.updateAnswer(this.answerId, this.answer).subscribe(() => {
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
      this.answer.ratingMinus.push(this.authorizedUser.id);

      // удалим id из ratingPlus
      const inPlusArray = this.ratingPlus.indexOf(this.authorizedUser.id);
      if(inPlusArray !== -1){
        this.ratingPlus.splice(inPlusArray, 1);
      }
    }

    this.subUpdateAnswer = this.answersService.updateAnswer(this.answerId, this.answer).subscribe(() => {
      this.calcRating();
    });
  }

  private calcRating(): void {
    this.subGetAnswer = this.answersService.getAnswer(this.answerId).subscribe((answer) => {
      this.answer = answer;
      this.ratingPlus = answer.ratingPlus;
      this.ratingMinus = answer.ratingMinus;
    });
  }

  private setSolution(): void {
    if(this.questionAuthor !== this.authorizedUser.id) { return; }

    // сделаем все ответы этого вопроса не отвеченным
    this.answersService.getAnswersByQ(this.questionId).subscribe((answers) => {
      answers.forEach((answer) => {
        answer.isSolution = false;
        this.subUpdateAnswer = this.answersService.updateAnswer(answer.id, answer).subscribe(() => {});
      });
    });

    // сделаем нужный ответ этого вопроса отвеченным
    if(this.answer.isSolution !== true) {
      setTimeout(() => {
        this.answer.isSolution = true;
        this.subUpdateAnswer = this.answersService.updateAnswer(this.answerId, this.answer).subscribe(() => { });
      }, 2000);
    }

    setTimeout(() => {
      this.refreshAnswers.emit(true);
    }, 3000);
  }

}
