import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Config } from '../../../config';


@Injectable()
export class TagsService {

  constructor(private httpClient: HttpClient) { }

  createTag(tag): Observable<any> {
    return this.httpClient.post(Config.host + 'tags', tag);
  }

  getTags(): Observable<any> {
    return this.httpClient.get(Config.host + `tags`);
  }

}
