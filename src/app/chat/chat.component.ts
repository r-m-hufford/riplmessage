import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from '../services/websocket.service';
import {NgForm} from '@angular/forms';
import {MessageDTO} from '../models/messageDTO';

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
    const messageDTO = new MessageDTO(sendForm.value.messageBody);
    this.webSocketService.sendMessage(messageDTO);
    sendForm.controls.message.reset();
  }

}
