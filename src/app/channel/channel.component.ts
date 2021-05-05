import { Component, OnInit } from '@angular/core';
import { Channel } from '../channel';
import { ChannelService } from '../channel.service';
import {Message} from '../message';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channels: Channel[] = [];
  selectedChannel: any = null;
  message = '';

  constructor(private channelService: ChannelService) { }

  ngOnInit(): void {
    this.channelService.findAll().subscribe(data => {this.channels = data;
    });
  }

  onClick(channel: Channel): void {
    this.selectedChannel = channel;
  }

  submitMessage(): void {
    const myMessage: Message = {messageBody: ''};
    this.selectedChannel?.messages.push(myMessage);
    this.message = '';
  }
}
