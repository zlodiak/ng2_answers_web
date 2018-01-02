import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

import { AnswersService } from '../../../shared/services/answers.service';
import { Answer } from '../../../shared/interfaces/answer';


@Component({
  selector: 'aw-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit, OnDestroy {

  private questionId: number;
  private answers: Answer[] = [];

  private getAnswersByQ: Subscription;
  private subParams: Subscription;

  constructor(private answersService: AnswersService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subParams = Observable.combineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams
    ).subscribe((data: [any, any]) => {
      this.questionId = +data[0]['id'];
      this.getAnswers();
    });
  }

  ngOnDestroy() {
    if(this.getAnswersByQ) { this.getAnswersByQ.unsubscribe(); }
    if(this.subParams) { this.subParams.unsubscribe(); }
  }

  private getAnswers(): void {
    this.getAnswersByQ = this.answersService.getAnswersByQ(this.questionId).subscribe((answers) => {
      this.answers = answers;
    });
  }

}
