import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UsersService } from '../../../shared/services/users.service';
import { QuestionsService } from '../../shared/services/questions.service';
import { Question } from '../../shared/interfaces/question';
import {User} from '../../../shared/interfaces/user';

@Component({
  selector: 'aw-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  private questionAuthor: string;
  private questionCreateNow: boolean;
  private questionId: number;

  private subQuestion: Subscription;
  private subQuestionId: Subscription;
  private subQuestionCreateNow: Subscription;
  private subAuthor: Subscription;
  private question: Question;

  constructor(private activatedRoute: ActivatedRoute,
              private questionsService: QuestionsService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.subQuestionId = this.subQuestionId = this.activatedRoute.params.subscribe(params => {
      this.questionId = +params['id'];
      this.getQuestion(this.questionId);
    });

    this.subQuestionCreateNow = this.activatedRoute.queryParams.subscribe(params => {
      this.questionCreateNow = params['questionCreateNow'];
    });
  }

  ngOnDestroy() {
    this.subQuestionId.unsubscribe();
    this.subQuestionCreateNow.unsubscribe();
    this.subAuthor.unsubscribe();
    this.subQuestion.unsubscribe();
  }

  private getQuestion(id): void{
    this.subQuestion = this.questionsService.getQuestion(id).subscribe((question) => {
      this.question = question;
      this.getAuthor(question.author);
    });
  }

  private getAuthor(authorId): void{
    this.subAuthor = this.usersService.getUserById(authorId).subscribe((user: User) => {
      this.questionAuthor = user.name;
    });
  }

}
