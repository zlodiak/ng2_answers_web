import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { User } from '../interfaces/user';


@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<any> {
    console.log('users ser', user, typeof user);
    return this.httpClient.post('http://localhost:3000/users', user);
  }

  getUserById(id: string): Observable<User> {
    console.log(id);
    return this.httpClient.get(`http://localhost:3000/users?id=${id}`).map((users: User) => {
      console.log(users[0]);
      return users[0] ? users[0] : undefined;
    });
  }

}
