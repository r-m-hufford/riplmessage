import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {User} from '../user';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findAll().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
