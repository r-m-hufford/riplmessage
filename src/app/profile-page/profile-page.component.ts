import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Channel } from '../models/channel';
import { DirectMessage } from '../models/direct-messages';
import { ChannelService } from '../services/channel.service';
import { MasterService } from '../services/master.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  channels: Channel[] = [];
  directMessages: DirectMessage[] = [];
  id: number;
  user: User;
  // currentChannel: Channel;

  constructor(private userService: UserService, private masterService: MasterService) { }

  ngOnInit(): void {
    this.masterService.currentUser.subscribe( id => this.id = id);

    this.userService.findById(this.id).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /*channelClick(): void {
    this.channelService.findById(2).subscribe(
      (data: Channel) => {
        this.currentChannel = data;
      }
    );
  }*/
}
