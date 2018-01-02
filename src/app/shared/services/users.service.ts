import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import { User } from '../interfaces/user';


@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<any> {
    console.log('users ser', user, typeof user);
    return this.httpClient.post('http://localhost:3000/users', user);
  }

  getUserById(id: string): Observable<any> | any {
    return this.httpClient.get(`http://localhost:3000/users?id=${id}`).map((users: User[]) => {
      return users[0] ? users[0] : undefined;
    });
  }

}
