import { Component, OnInit } from '@angular/core';
import { Channel } from '../models/channel';
import { ChannelService } from '../services/channel.service';
import {Message} from '../models/message';
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
