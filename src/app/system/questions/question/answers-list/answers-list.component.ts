import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

import { Answer } from '../../../shared/interfaces/answer';

import { AnswersService } from '../../../shared/services/answers.service';
import { DateService } from '../../../../shared/services/date.service';
import { UsersService } from '../../../../shared/services/users.service';
import { QuestionsService } from '../../../shared/services/questions.service';


@Component({
  selector: 'aw-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit, OnDestroy {

  private questionId: number;
  private questionAuthor: string;
  private answers: Answer[] = [];
  private answers_: any[] = [];

  private getAnswersByQ: Subscription;
  private subParams: Subscription;
  private subGetAuthorName: Subscription;

  constructor(private answersService: AnswersService,
              private activatedRoute: ActivatedRoute,
              private dateService: DateService,
              private questionsService: QuestionsService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.subParams = Observable.combineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams
    ).subscribe((data: [any, any]) => {
      this.questionId = +data[0]['id'];
      this.getAnswers();

      this.questionsService.getQuestion(this.questionId).subscribe((question) => {
        this.questionAuthor = question.author;
      });
    });
  }

  ngOnDestroy() {
    if(this.getAnswersByQ) { this.getAnswersByQ.unsubscribe(); }
    if(this.subParams) { this.subParams.unsubscribe(); }
    if(this.subGetAuthorName) { this.subGetAuthorName.unsubscribe(); }
  }

  private getAnswers(): void {
    this.getAnswersByQ = this.answersService.getAnswersByQ(this.questionId).subscribe((answers) => {
      answers.forEach((a) => {
        a['createdDateHuman'] = this.dateService.fromUnixToHuman(a['createdDateUnix']);
        this.subGetAuthorName = this.usersService.getUserById(a.author).subscribe((user) => {
          a['authorName'] = user.name;
        });
      });
      this.answers_ = answers;
    });
  }



}
