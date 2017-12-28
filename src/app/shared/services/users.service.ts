import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/of';

import { User } from '../interfaces/user';
import { HashService } from './hash.service';


@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient,
              private hashService: HashService) {}

  createUser(user: User): Observable<any> {
    console.log('users ser', user, typeof user);
    return this.httpClient.post('http://localhost:3000/users', user);
  }

  getUserById(id: string): Observable<User> {
    console.log(id);
    return this.httpClient.get(`http://localhost:3000/users?id=${id}`).map((users: User) => {
      // console.log(users[0]);
      return users[0] ? users[0] : undefined;
    });
  }

  isValidPassword(id, password): Promise<boolean>{
    const passwordHash = this.hashService.generate(password);
    console.log(passwordHash);

    return new Promise((resolve, reject) => {
      this.getUserById(id).subscribe((user: User) => {
        if(user && passwordHash === user.password) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

  }

}
