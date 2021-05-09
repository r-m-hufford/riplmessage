import {Component, OnDestroy, OnInit} from '@angular/core';
import { Channel } from '../models/channel';
import { ChannelService } from '../services/channel.service';
import {MessageDTO} from '../models/messageDTO';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {ChatComponent} from '../chat/chat.component';
import {WebsocketService} from '../services/websocket.service';
import {NgForm} from '@angular/forms';
import {Message} from '../models/message';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, OnDestroy {
  channels: Channel[] = [];
  selectedChannel?: Channel;
  messages: Message[] = [];
  message = '';
  user: User;

  constructor(private channelService: ChannelService, private userService: UserService, public websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.userService.findById(1).subscribe(
      (data: User) => {
        this.user = data;
      }
    );

    this.websocketService.openWebSocket();

    // this.channelService.findAll().subscribe(
    //   (data: Channel[]) => {
    //     this.channels = data;
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );
    this.initializeChannels(1);

  }

  ngOnDestroy(): void {
    this.websocketService.closeWebSocket();
  }

  initializeChannels(id: number):void {
    this.channelService.findUserChannels(id).subscribe(
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

  // submitMessage(): void {
  //   let date: Date = new Date();
  //   let newMessage: Message = {messageBody: this.message, timeStamp: date, channel: this.selectedChannel};
  //   this.channelService.addMessage(newMessage).subscribe();
  //   // @ts-ignore
  //   this.selectedChannel?.messages.push(newMessage);
  //   this.message = '';
  //   this.channelService.updateChannel(this.selectedChannel?.id, this.selectedChannel).subscribe();
  // }


  testCreateChannel(): void {
    const testChannel: Channel = {name: 'testChannel', messages: this.selectedChannel?.messages};
    this.channelService.createChannel(testChannel).subscribe();
  }

  testlog(): void {
    console.log(this.user);
  }

  sendMessage(sendForm: NgForm) {
    const messageDTO = new MessageDTO(sendForm.value.messageBody);
    let newMessage: Message = {messageBody: sendForm.value.messageBody};
    // @ts-ignore
    this.channelService.addMessage(newMessage).subscribe();
    // this.channelService.updateChannel(this.selectedChannel?.id, this.selectedChannel).subscribe();
    this.websocketService.sendMessage(messageDTO);
    sendForm.controls.messageBody.reset();
    console.log(newMessage);
  }

}
