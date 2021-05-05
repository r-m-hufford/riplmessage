import { Component, OnInit } from '@angular/core';
import { Channel } from '../channel';
import { ChannelService } from '../channel.service';
import {Message} from '../message';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channels: Channel[] = [];
  selectedChannel?: Channel;
  message = '';

  constructor(private channelService: ChannelService) { }

  ngOnInit(): void {
    this.channelService.findAll().subscribe(
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
    const date: Date = new Date();
    const newMessage: Message = {messageBody: this.message, timeStamp: date, channel: this.selectedChannel};
    this.selectedChannel?.messages.push(newMessage);
    this.message = '';
    this.channelService.updateChannel(this.selectedChannel?.id, this.selectedChannel);
  }

  testCreateChannel(): void {
    let channelfound: Channel;
    console.log(this.channelService.findById(1).subscribe(channel => channelfound = channel));
  }
}
