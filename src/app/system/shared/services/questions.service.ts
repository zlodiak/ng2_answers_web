import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Question } from '../interfaces/question';


@Injectable()
export class QuestionsService {

  constructor(private httpClient: HttpClient) { }

  createQuestion(question: Question): Observable<any> {
    console.log(111);
    return this.httpClient.post('http://localhost:3000/questions', question);
  }

}
