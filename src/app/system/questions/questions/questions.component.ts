import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DateService } from '../../../shared/services/date.service';
import { TagsService } from '../../shared/services/tags.service';
import { QuestionsService } from '../../shared/services/questions.service';

import { Question } from '../../shared/interfaces/question';
import { Tag } from '../../shared/interfaces/tag';


@Component({
  selector: 'aw-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  private questions: Question[] = [];
  private tags: Tag[] = [];

  private subGetTags: Subscription;

  constructor(private questionsService: QuestionsService,
              private tagsService: TagsService,
              private dateService: DateService) { }

  ngOnInit() {
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

}
