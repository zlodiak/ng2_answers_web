import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

import { InfoDialogComponent } from '../../../../shared/dialogs/info-dialog/info-dialog.component';

import { UsersService } from '../../../../shared/services/users.service';
import { QuestionsService } from '../../../shared/services/questions.service';
import { DateService } from '../../../../shared/services/date.service';
import { TagsService } from '../../../shared/services/tags.service';
import { GlobalVarsService } from '../../../../shared/services/global-vars.service';
import { CommentsService } from '../../../shared/services/comments.service';

import { Question } from '../../../shared/interfaces/question';
import { User } from '../../../../shared/interfaces/user';
import { Tag } from '../../../shared/interfaces/tag';
import { QuestionComment } from '../../../shared/interfaces/question-comment';


@Component({
  selector: 'aw-question-body',
  templateUrl: './question-body.component.html',
  styleUrls: ['./question-body.component.scss']
})
export class QuestionBodyComponent implements OnInit, OnDestroy {

  private subAuthor: Subscription;
  private subQuestion: Subscription;
  private subTags: Subscription;
  private subCreateQuestionComment: Subscription;
  private subQuestionCommentsService: Subscription;
  private subGetAuthorName: Subscription;

  private question: Question;
  private createdDateHuman: string;
  private questionAuthor: string;
  private tagsObj: Object = {};
  private authorizedUser: User;
  private questionCommentFormVisibility: boolean = false;
  private questionCommentFormValue: string = '';
  private questionComments_: any = [];

  @Input() questionId: string;

  constructor(private globalVarsService: GlobalVarsService,
              private commentsService: CommentsService,
              private questionsService: QuestionsService,
              private usersService: UsersService,
              private matDialog: MatDialog,
              private dateService: DateService,
              private tagsService: TagsService) { }

  ngOnInit() {
    this.getQuestion(this.questionId);
    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();
    this.getQuestionComments();
  }

  ngOnDestroy() {
    if(this.subAuthor) { this.subAuthor.unsubscribe(); }
    if(this.subQuestion) { this.subQuestion.unsubscribe(); }
    if(this.subTags) { this.subTags.unsubscribe(); }
    if(this.subCreateQuestionComment) { this.subCreateQuestionComment.unsubscribe(); }
    if(this.subQuestionCommentsService) { this.subQuestionCommentsService.unsubscribe(); }
    if(this.subGetAuthorName) { this.subGetAuthorName.unsubscribe(); }
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

  private showQuestionCommentForm(): void {
    this.questionCommentFormVisibility = true;
  }

  private setQuestionCommentFormValue(ev): void {
    this.questionCommentFormValue = ev.target.value;
  }

  private sendQuestionComment(questionId): void {
    // id autoincrement
    const questionComment: QuestionComment = {
      createdDateUnix: '' + (Date.now() / 1000),
      author: this.authorizedUser.id,
      body: this.questionCommentFormValue,
      isDeleted: false,
      ratingPlus: [],
      questionId: this.questionId
    };

    this.subCreateQuestionComment = this.commentsService.createQuestionComment(questionComment).subscribe((resp) => {
      this.questionCommentFormValue = '';

      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: {title: 'Выполнено', message: 'Ваш комментарий добавлен'}
      });

      this.getQuestionComments();
    });
  }

  private getQuestionComments(): void {
    this.subQuestionCommentsService = this.commentsService.getQuestionComments().subscribe((questionComments) => {
      questionComments.forEach((qc) => {
        qc['createdDateHuman'] = this.dateService.fromUnixToHuman(qc['createdDateUnix']);
        this.subGetAuthorName = this.usersService.getUserById(qc.author).subscribe((user) => {
          qc['author'] = user.name;
        });
      });
      this.questionComments_ = questionComments;
    });
  }

}
