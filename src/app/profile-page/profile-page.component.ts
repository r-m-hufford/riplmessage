import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Channel } from '../models/channel';
import { DirectMessage } from '../models/direct-messages';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  users?: User[];
  channels: Channel[] = [];
  directMessages: DirectMessage[] = [];
  user: User;
  currentChannel: Channel;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findById(1).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  channelClick(): void {
    console.log(channel);
  }



}
