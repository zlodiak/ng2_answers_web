import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../shared/interfaces/user';



@Component({
  selector: 'aw-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

}
