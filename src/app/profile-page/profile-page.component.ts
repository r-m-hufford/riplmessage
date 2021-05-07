import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {User} from '../user';
import {HttpErrorResponse} from '@angular/common/http';
import {Channel} from '../channel';
import {DirectMessage} from '../direct-messages';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  users?: User[];
  channels: Channel[] = [];
  directMessages: DirectMessage[] = [];
  user?: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findById(2).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
