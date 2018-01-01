import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Answer } from '../interfaces/answer';


@Injectable()
export class AnswersService {

  constructor(private httpClient: HttpClient) { }

  getAnswerByQU(questionId: number, userId: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/answers?questionId=${questionId}&author=${userId}`);
  }

  createAnswer(answer: Answer): Observable<any> {
    return this.httpClient.post('http://localhost:3000/answers', answer);
  }

}
