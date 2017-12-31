import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Answer } from '../interfaces/answer';


@Injectable()
export class AnswersService {

  constructor(private httpClient: HttpClient) { }

  createAnswer(answer: Answer): Observable<any> {
    return this.httpClient.post('http://localhost:3000/answers', answer);
  }

}
