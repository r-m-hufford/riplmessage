import { Injectable } from '@angular/core';
import {MessageDTO} from '../models/messageDTO';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocket: WebSocket;
  chatMessages: MessageDTO[] = [];

  constructor() { }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');

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
