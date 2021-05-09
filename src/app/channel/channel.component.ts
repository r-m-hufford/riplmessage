import { Component, OnInit } from '@angular/core';
import { Channel } from '../models/channel';
import { ChannelService } from '../services/channel.service';
import {Message} from '../models/message';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channels: Channel[] = [];
  selectedChannel?: Channel;
  message = '';
  user: User;

  constructor(private channelService: ChannelService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findById(1).subscribe(
      (data: User) => {
        this.user = data;
      }
    );

    this.channelService.findUserChannels(this.user.id).subscribe(
      (data: Channel[]) => {
        this.channels = data;
        },
      (error: HttpErrorResponse) => {
        alert(error.message);
        }
    );
  }

  onClick(channel: Channel): void {
    this.selectedChannel = channel;
  }

  submitMessage(): void {
    let date: Date = new Date();
    let newMessage: Message = {messageBody: this.message, timeStamp: date, channel: this.selectedChannel};
    this.channelService.addMessage(newMessage).subscribe();
    // @ts-ignore
    this.selectedChannel?.messages.push(newMessage);
    this.message = '';
    this.channelService.updateChannel(this.selectedChannel?.id, this.selectedChannel).subscribe();
  }

  testCreateChannel(): void {
    const testChannel: Channel = {name: 'testChannel', messages: this.selectedChannel?.messages};
    this.channelService.createChannel(testChannel).subscribe();
  }


}
