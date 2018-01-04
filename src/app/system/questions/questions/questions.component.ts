import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { DateService } from '../../shared/services/date.service';
import { TagsService } from '../../shared/services/tags.service';
import { QuestionsService } from '../../shared/services/questions.service';
import { GlobalVarsService } from '../../shared/services/global-vars.service';

import { Question } from '../../shared/interfaces/question';
import { Tag } from '../../shared/interfaces/tag';
import { User } from '../../../shared/interfaces/user';


@Component({
  selector: 'aw-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  private questions: Question[] = [];
  private tags: Tag[] = [];
  private authorizedUser: User;

  private subGetTags: Subscription;

  constructor(private questionsService: QuestionsService,
              private tagsService: TagsService,
              private router: Router,
              private globalVarsService: GlobalVarsService,
              private dateService: DateService) { }

  ngOnInit() {
    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();

    this.getQuestions();

    this.subGetTags = this.tagsService.getTags().subscribe((tags) => {
      tags.forEach((t) => {
        this.tags[t.id] = t.title;
      });
    });
  }

  ngOnDestroy() {
    if(this.subGetTags) { this.subGetTags.unsubscribe(); }
  }

  private getQuestions(): void {
    this.questionsService.getQuestions().subscribe((questions) => {
      questions.forEach((q) => {
        q['createdDateHuman'] = this.dateService.fromUnixToHuman(q['createdDateUnix']);
      });
      this.questions = questions;
    });
  }

  private toCreateQuestion(): void {
    this.router.navigate(['/question-create']);
  }

}
