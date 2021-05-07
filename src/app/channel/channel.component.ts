import { Component, OnInit } from '@angular/core';
import { Channel } from '../channel';
import { ChannelService } from '../channel.service';
import {Message} from '../message';
import {HttpErrorResponse} from '@angular/common/http';
import {webSocket} from 'rxjs/webSocket';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channels: Channel[] = [];
  selectedChannel?: Channel;
  message = '';
  subject = webSocket('ws://localhost:8080/chat');

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

  sendToServer($event) {
    this.subject.subscribe();
    this.subject.next(this.message);
    this.subject.complete();
  }

  onClick(channel: Channel): void {
    this.selectedChannel = channel;
  }

  submitMessage($event): void {
    let date: Date = new Date();
    let newMessage: Message = {messageBody: this.message, timeStamp: date, channel: this.selectedChannel};
    this.channelService.addMessage(newMessage).subscribe();
    this.selectedChannel?.messages.push(newMessage);
    this.subject.subscribe();
    this.subject.next(this.message);
    this.subject.complete();
    this.message = '';
    this.channelService.updateChannel(this.selectedChannel?.id, this.selectedChannel).subscribe();
  }

  testCreateChannel(): void {
    const testChannel: Channel = {name: 'testChannel', messages: this.selectedChannel?.messages};
    this.channelService.createChannel(testChannel).subscribe();
  }
}
