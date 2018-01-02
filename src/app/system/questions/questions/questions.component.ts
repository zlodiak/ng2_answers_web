import { Component, OnInit } from '@angular/core';

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
export class QuestionsComponent implements OnInit {

  private questions: Question[] = [];
  private tags: Tag[] = [];

  constructor(private questionsService: QuestionsService,
              private tagsService: TagsService,
              private dateService: DateService) { }

  ngOnInit() {
    this.getQuestions();

    this.tagsService.getTags().subscribe((tags) => {
      tags.forEach((t) => {
        this.tags[t.id] = t.title
      });
    });
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
