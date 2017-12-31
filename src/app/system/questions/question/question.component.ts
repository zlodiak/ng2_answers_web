import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'aw-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  private questionCreateNow: boolean;
  private questionId: number;

  private subQuestionId: Subscription;
  private subQuestionCreateNow: Subscription;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subQuestionId = this.subQuestionId = this.activatedRoute.params.subscribe(params => {
      this.questionId = +params['id'];
    });

    this.subQuestionCreateNow = this.activatedRoute.queryParams.subscribe(params => {
      this.questionCreateNow = params['questionCreateNow'];
    });
  }

  ngOnDestroy() {
    if(this.subQuestionId) { this.subQuestionId.unsubscribe(); }
    if(this.subQuestionCreateNow) { this.subQuestionCreateNow.unsubscribe(); }
  }

}
