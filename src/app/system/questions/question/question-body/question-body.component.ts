import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UsersService } from '../../../../shared/services/users.service';
import { QuestionsService } from '../../../shared/services/questions.service';
import { DateService } from '../../../../shared/services/date.service';
import { TagsService } from '../../../shared/services/tags.service';

import { Question } from '../../../shared/interfaces/question';
import { User } from '../../../../shared/interfaces/user';
import { Tag } from '../../../shared/interfaces/tag';


@Component({
  selector: 'aw-question-body',
  templateUrl: './question-body.component.html',
  styleUrls: ['./question-body.component.scss']
})
export class QuestionBodyComponent implements OnInit, OnDestroy {

  private subAuthor: Subscription;
  private subQuestion: Subscription;
  private subTags: Subscription;

  private question: Question;
  private createdDateHuman: string;
  private questionAuthor: string;
  private tagsObj: Object = {};

  @Input() questionId: string;

  constructor(private questionsService: QuestionsService,
              private usersService: UsersService,
              private dateService: DateService,
              private tagsService: TagsService) { }

  ngOnInit() {
    this.getQuestion(this.questionId);
  }

  ngOnDestroy() {
    if(this.subAuthor) { this.subAuthor.unsubscribe(); }
    if(this.subQuestion) { this.subQuestion.unsubscribe(); }
    if(this.subTags) { this.subTags.unsubscribe(); }
  }

  private getQuestion(id): void {
    this.subQuestion = this.questionsService.getQuestion(id).subscribe((question) => {
      this.question = question;
      this.getAuthor(question.author);
      this.getTags(question.tags);
      this.createdDateHuman = this.dateService.fromUnixToHuman(this.question.createdDateUnix);
    });
  }

  private getTags(tagsIds): void {
    this.subTags = this.tagsService.getTags().subscribe((tags: Tag[]) => {
      tags.forEach((tagObj) => {
        this.tagsObj[tagObj.id] = tagObj.title;
      });
    });
  }

  private getAuthor(authorId): void {
    this.subAuthor = this.usersService.getUserById(authorId).subscribe((user: User) => {
      this.questionAuthor = user.name;
    });
  }

}
