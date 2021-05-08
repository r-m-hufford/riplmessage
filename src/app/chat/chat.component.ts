import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from '../services/websocket.service';
import {NgForm} from '@angular/forms';
import {Message} from '../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(public webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy() {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    const date = new Date();
    const message = new Message(sendForm.value.messageBody, sendForm.value.senderId);
    this.webSocketService.sendMessage(message);
    sendForm.controls.message.reset();
  }

}
