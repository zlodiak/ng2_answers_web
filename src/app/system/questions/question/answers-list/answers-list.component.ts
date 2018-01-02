import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { MatDialog } from '@angular/material';

import { InfoDialogComponent } from '../../../../shared/dialogs/info-dialog/info-dialog.component';

import { AnswerComment } from '../../../shared/interfaces/answer-comment';
import { Answer } from '../../../shared/interfaces/answer';
import { User } from '../../../../shared/interfaces/user';

import { AnswersService } from '../../../shared/services/answers.service';
import { DateService } from '../../../../shared/services/date.service';
import { UsersService } from '../../../../shared/services/users.service';
import { GlobalVarsService } from '../../../../shared/services/global-vars.service';
import { CommentsService } from '../../../shared/services/comments.service';


@Component({
  selector: 'aw-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit, OnDestroy {

  private questionId: number;
  private answers: Answer[] = [];
  private answers_: any[] = [];
  private authorizedUser: User;
  private commentsFormsVisibility: Object = {};
  private commentFormValues: Object = {};

  private getAnswersByQ: Subscription;
  private subParams: Subscription;
  private subGetAuthorName: Subscription;
  private subCreateAnswerComment: Subscription;

  constructor(private commentsService: CommentsService,
              private globalVarsService: GlobalVarsService,
              private answersService: AnswersService,
              private matDialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private dateService: DateService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.subParams = Observable.combineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams
    ).subscribe((data: [any, any]) => {
      this.questionId = +data[0]['id'];
      this.getAnswers();
    });

    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();
  }

  ngOnDestroy() {
    if(this.getAnswersByQ) { this.getAnswersByQ.unsubscribe(); }
    if(this.subParams) { this.subParams.unsubscribe(); }
    if(this.subGetAuthorName) { this.subGetAuthorName.unsubscribe(); }
    if(this.subCreateAnswerComment) { this.subCreateAnswerComment.unsubscribe(); }
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

  private sendComment(id): void {
    // id autoincrement
    const answerComment: AnswerComment = {
      createdDateUnix: '' + (Date.now() / 1000),
      author: this.authorizedUser.id,
      body: this.commentFormValues[id],
      isDeleted: false,
      ratingPlus: [],
      answerId: id
    };

    this.subCreateAnswerComment = this.commentsService.createAnswerComment(answerComment).subscribe((resp) => {
      this.commentFormValues[id] = '';

      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: {title: 'Выполнено', message: 'Ваш комментарий добавлен'}
      });
    });
  }

  private toggleCommentsFormsVisibility(id): void {
    this.commentsFormsVisibility[id] = !this.commentsFormsVisibility[id];
  }

  private setCommentFormValues(id, ev): void {
    // console.log(id, ev.target.value);
    this.commentFormValues[id] = ev.target.value;
  }

}
