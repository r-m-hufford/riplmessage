import { Injectable } from '@angular/core';
import {MessageDTO} from '../models/messageDTO';
import {Channel} from '../models/channel';
import {MasterService} from './master.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // @ts-ignore
  webSocket: WebSocket;
  channelId?: number;
  chatMessages: MessageDTO[] = [];

  constructor(private masterService: MasterService) { this.masterService.currentChannel.subscribe( (channelId: number) => {
    this.channelId = channelId;
  });
  }

  public openWebSocket() {
    const url = 'wss://ripldatabase.herokuapp.com/chat';
    this.webSocket = new WebSocket(url);

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.chatMessages.push(message);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(messageDTO: MessageDTO) {
    this.webSocket.send(JSON.stringify(messageDTO));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
