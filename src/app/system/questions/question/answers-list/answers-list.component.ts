import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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

  private subQuestionId: Subscription;

  constructor(private answersService: AnswersService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subQuestionId = this.activatedRoute.params.subscribe(params => {
      this.questionId = +params['id'];
      this.getAnswers();
    });
  }

  ngOnDestroy() {
    if(this.subQuestionId) { this.subQuestionId.unsubscribe(); }
  }

  private getAnswers(): void {
    this.answersService.getAnswersByQ(this.questionId).subscribe((answers) => {
      this.answers = answers;
    });
  }

}
