import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

import { Answer } from '../../../shared/interfaces/answer';
import { User } from '../../../../shared/interfaces/user';

import { AnswersService } from '../../../shared/services/answers.service';
import { DateService } from '../../../../shared/services/date.service';
import { UsersService } from '../../../../shared/services/users.service';
import { GlobalVarsService } from '../../../../shared/services/global-vars.service';


@Component({
  selector: 'aw-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit, OnDestroy {

  private form: FormGroup;
  private questionId: number;
  private answers: Answer[] = [];
  private answers_: any[] = [];
  private authorizedUser: User;
  private commentsFormsVisibility: Object = {};

  private getAnswersByQ: Subscription;
  private subParams: Subscription;
  private subGetAuthorName: Subscription;

  constructor(private globalVarsService: GlobalVarsService,
              private answersService: AnswersService,
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

    this.form = new FormGroup({
      'comment': new FormControl('', [Validators.required, Validators.minLength(1)])
    });

    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();
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

  private sendComment(): void {
    console.log(this.form);
  }

  private toggleCommentsFormsVisibility(id): void {
    console.log(id);
    this.commentsFormsVisibility[id] = !this.commentsFormsVisibility[id];
  }

}
