import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Answer } from '../interfaces/answer';
import { Config } from '../../../config';


@Injectable()
export class AnswersService {

  constructor(private httpClient: HttpClient) { }

  getAnswersByQ(questionId: number): Observable<any> {
    return this.httpClient.get(Config.host + `answers?questionId=${questionId}`);
  }

  getAnswerByQU(questionId: number, userId: string): Observable<any> {
    return this.httpClient.get(Config.host + `answers?questionId=${questionId}&author=${userId}`);
  }

  createAnswer(answer: Answer): Observable<any> {
    return this.httpClient.post(Config.host + 'answers', answer);
  }

}
