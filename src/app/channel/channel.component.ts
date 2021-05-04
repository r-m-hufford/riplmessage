import { Component, OnInit } from '@angular/core';
import { Channel } from '../channel';
import { CHANNELS } from '../mock-channels';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channels = CHANNELS;
  selectedChannel?: Channel;
  message = '';

  constructor() { }

  ngOnInit(): void {
  }

  onClick(channel: Channel): void {
    this.selectedChannel = channel;
  }

  submitMessage(): void {
    this.selectedChannel?.messages.push(this.message);
    this.message = '';
  }
}
