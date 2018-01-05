import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { QuestionsService } from '../../shared/services/questions.service';
import { DateService } from '../../../shared/services/date.service';
import { Question } from '../../shared/interfaces/question';
import { Tag } from '../../shared/interfaces/tag';
import { TagsService } from '../../shared/services/tags.service';

@Component({
  selector: 'aw-tag-questions',
  templateUrl: './tag-questions.component.html',
  styleUrls: ['./tag-questions.component.scss']
})
export class TagQuestionsComponent implements OnInit, OnDestroy {

  private questions: Question[] = [];
  private tags: Tag[] = [];
  private tagId: number;

  private subGetTags: Subscription;
  private subParams: Subscription;

  constructor(private questionsService: QuestionsService,
              private activatedRoute: ActivatedRoute,
              private tagsService: TagsService,
              private dateService: DateService) { }

  ngOnInit() {
    this.subParams = this.activatedRoute.params.subscribe((params) => {
      this.tagId = +params['tag_id'];
      this.getQuestions();
    });

    this.subGetTags = this.tagsService.getTags().subscribe((tags) => {
      tags.forEach((t) => {
        this.tags[t.id] = t.title;
      });
    });
  }

  ngOnDestroy() {
    if(this.subGetTags) { this.subGetTags.unsubscribe(); }
    if(this.subParams) { this.subParams.unsubscribe(); }
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
