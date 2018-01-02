import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AnswerComment } from '../interfaces/answer-comment';
import { Config } from '../../../config';


@Injectable()
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  createAnswerComment(answerComment: AnswerComment): Observable<any> {
    return this.httpClient.post(Config.host + 'answerComments', answerComment);
  }

  getAnswerComments(): Observable<any> {
    return this.httpClient.get(Config.host + 'answerComments');
  }

}
