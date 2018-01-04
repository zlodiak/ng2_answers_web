import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { InfoDialogComponent } from '../../../../../shared/dialogs/info-dialog/info-dialog.component';
import { QuestionComment } from '../../../../shared/interfaces/question-comment';
import { User } from '../../../../../shared/interfaces/user';

import { CommentsService } from '../../../../shared/services/comments.service';
import { DateService } from '../../../../shared/services/date.service';
import { UsersService } from '../../../../shared/services/users.service';
import { GlobalVarsService } from '../../../../shared/services/global-vars.service';

@Component({
  selector: 'aw-question-comments',
  templateUrl: './question-comments.component.html',
  styleUrls: ['./question-comments.component.scss']
})
export class QuestionCommentsComponent implements OnInit, OnDestroy {

  private questionCommentFormVisibility: boolean = false;
  private questionCommentFormValue: string = '';
  private questionComments_: any = [];
  private authorizedUser: User;

  private subCreateQuestionComment: Subscription;
  private subQuestionCommentsService: Subscription;
  private subGetAuthorName: Subscription;

  @Input() questionId: number;

  constructor(private dateService: DateService,
              private matDialog: MatDialog,
              private globalVarsService: GlobalVarsService,
              private usersService: UsersService,
              private commentsService: CommentsService) { }

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();
    this.getQuestionComments();
  }

  ngOnDestroy() {
    if(this.subCreateQuestionComment) { this.subCreateQuestionComment.unsubscribe(); }
    if(this.subQuestionCommentsService) { this.subQuestionCommentsService.unsubscribe(); }
    if(this.subGetAuthorName) { this.subGetAuthorName.unsubscribe(); }
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
      questionId: +this.questionId
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
