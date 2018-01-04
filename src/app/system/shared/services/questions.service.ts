import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Question } from '../interfaces/question';
import { Config } from '../../../config';


@Injectable()
export class QuestionsService {

  constructor(private httpClient: HttpClient) { }

  updateQuestion(id: number, question: Question): Observable<any> {
    return this.httpClient.put(Config.host + `questions/${id}`, question);
  }

  getQuestion(id: number): Observable<any> {
    return this.httpClient.get(Config.host + `questions/${id}`);
  }

  createQuestion(question: Question): Observable<any> {
    return this.httpClient.post(Config.host + 'questions', question);
  }

  getQuestions(): Observable<any> {
    return this.httpClient.get(Config.host + `questions`);
  }

}
