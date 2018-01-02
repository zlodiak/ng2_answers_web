import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Tag } from '../../shared/interfaces/tag';


@Injectable()
export class TagsService {

  constructor(private httpClient: HttpClient) { }

  createTag(tag): Observable<any> {
    return this.httpClient.post('http://localhost:3000/tags', tag);
  }

  getTags(): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/tags`);
  }

}
