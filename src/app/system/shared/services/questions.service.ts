import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Question } from '../interfaces/question';


@Injectable()
export class QuestionsService {

  constructor(private httpClient: HttpClient) { }

  getQuestion(id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/questions/${id}`);
  }

  createQuestion(question: Question): Observable<any> {
    return this.httpClient.post('http://localhost:3000/questions', question);
  }

  getQuestions(): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/questions`);
  }

}
