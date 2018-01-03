import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { InfoDialogComponent } from '../../../../../shared/dialogs/info-dialog/info-dialog.component';

import { User } from '../../../../../shared/interfaces/user';
import { AnswerComment } from '../../../../shared/interfaces/answer-comment';

import { GlobalVarsService } from '../../../../../shared/services/global-vars.service';
import { CommentsService } from '../../../../shared/services/comments.service';
import { DateService } from '../../../../../shared/services/date.service';
import { UsersService } from '../../../../../shared/services/users.service';


@Component({
  selector: 'aw-answer-comments',
  templateUrl: './answer-comments.component.html',
  styleUrls: ['./answer-comments.component.scss']
})
export class AnswerCommentsComponent implements OnInit, OnDestroy {

  private authorizedUser: User;
  private commentsFormsVisibility: boolean = false;
  private commentFormValues: string = '';
  private answerComments_: any = [];

  private subCreateAnswerComment: Subscription;
  private subCommentsService: Subscription;
  private subAnswerCommentsService: Subscription;
  private subGetAuthorName: Subscription;

  @Input() answerId: string;

  constructor(private commentsService: CommentsService,
              private matDialog: MatDialog,
              private dateService: DateService,
              private globalVarsService: GlobalVarsService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();
    this.getAnswerComments();
  }

  ngOnDestroy() {
    if(this.subCreateAnswerComment) { this.subCreateAnswerComment.unsubscribe(); }
    if(this.subCommentsService) { this.subCommentsService.unsubscribe(); }
    if(this.subAnswerCommentsService) { this.subAnswerCommentsService.unsubscribe(); }
    if(this.subGetAuthorName) { this.subGetAuthorName.unsubscribe(); }
  }

  private sendComment(id): void {
    // id autoincrement
    const answerComment: AnswerComment = {
      createdDateUnix: '' + (Date.now() / 1000),
      author: this.authorizedUser.id,
      body: this.commentFormValues,
      isDeleted: false,
      ratingPlus: [],
      answerId: id
    };

    this.subCreateAnswerComment = this.commentsService.createAnswerComment(answerComment).subscribe((resp) => {
      this.commentFormValues = '';

      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: {title: 'Выполнено', message: 'Ваш комментарий добавлен'}
      });

      this.getAnswerComments();
    });
  }

  private toggleCommentsFormsVisibility(): void {
    this.commentsFormsVisibility = !this.commentsFormsVisibility;
  }

  private setCommentFormValues(id, ev): void {
    // console.log(id, ev.target.value);
    this.commentFormValues = ev.target.value;
  }

  private getAnswerComments(): void {
    this.subAnswerCommentsService = this.commentsService.getAnswerComments().subscribe((answerComments) => {
      answerComments.forEach((ac) => {
        ac['createdDateHuman'] = this.dateService.fromUnixToHuman(ac['createdDateUnix']);
        this.subGetAuthorName = this.usersService.getUserById(ac.author).subscribe((user) => {
          ac['author'] = user.name;
        });
      });
      this.answerComments_ = answerComments;
    });
  }

}
