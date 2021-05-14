import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Channel } from '../models/channel';
import { DirectMessage } from '../models/direct-messages';
import { ChannelService } from '../services/channel.service';
import { MasterService } from '../services/master.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {EditProfileComponent} from '../edit-profile/edit-profile.component';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  channels: Channel[] = [];
  directMessages: DirectMessage[] = [];
  // @ts-ignore
  id: number;
  // @ts-ignore
  user: User;
  // currentChannel?: Channel;
  channelId?: number;

  constructor(private userService: UserService, private masterService: MasterService,
              private dialog: MatDialog){ }

  ngOnInit(): void {
    this.masterService.currentUser.subscribe(id => {
      this.userService.findById(id)
      .subscribe((data: User) => {
        this.user = data;
      });
    });
  }

  channelClick(channelId: number): void {
    this.masterService.changeCurrentChannel(channelId);
  }

  // tslint:disable-next-line:typedef
  openDialog(){
    this.dialog.open(EditProfileComponent, {
      data: {courseId: 1}
    })
      .afterClosed()
      .subscribe(result => console.log(result));
  }
}
