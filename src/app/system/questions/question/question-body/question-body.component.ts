import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UsersService } from '../../../../shared/services/users.service';
import { QuestionsService } from '../../../shared/services/questions.service';
import { DateService } from '../../../../shared/services/date.service';

import { Question } from '../../../shared/interfaces/question';
import { User } from '../../../../shared/interfaces/user';


@Component({
  selector: 'aw-question-body',
  templateUrl: './question-body.component.html',
  styleUrls: ['./question-body.component.scss']
})
export class QuestionBodyComponent implements OnInit, OnDestroy {

  private subAuthor: Subscription;
  private subQuestion: Subscription;

  private question: Question;
  private creationDateHuman: string;
  private questionAuthor: string;

  @Input() questionId: string;

  constructor(private questionsService: QuestionsService,
              private usersService: UsersService,
              private dateService: DateService) { }

  ngOnInit() {
    this.getQuestion(this.questionId);
  }

  ngOnDestroy() {
    if(this.subAuthor) { this.subAuthor.unsubscribe(); }
    if(this.subQuestion) { this.subQuestion.unsubscribe(); }
  }

  private getQuestion(id): void {
    this.subQuestion = this.questionsService.getQuestion(id).subscribe((question) => {
      this.question = question;
      this.getAuthor(question.author);
      this.creationDateHuman = this.dateService.fromUnixToHuman(this.question.createdDateUnix);
      console.log(this.creationDateHuman);
    });
  }

  private getAuthor(authorId): void {
    this.subAuthor = this.usersService.getUserById(authorId).subscribe((user: User) => {
      this.questionAuthor = user.name;
      console.log(this.questionAuthor);
    });
  }

}
