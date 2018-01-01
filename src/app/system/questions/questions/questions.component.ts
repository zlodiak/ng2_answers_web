import { Component, OnInit } from '@angular/core';

import { QuestionsService } from '../../shared/services/questions.service';
import { Question } from '../../shared/interfaces/question';

@Component({
  selector: 'aw-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  private questions: Question[] = [];

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.getQuestions();
  }

  private getQuestions(): void {
    this.questionsService.getQuestions().subscribe((questions) => {
      this.questions = questions;
    });
  }

}
