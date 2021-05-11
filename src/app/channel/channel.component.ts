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
import {MasterService} from '../services/master.service';
import {formatDate} from '@angular/common';
import {Timestamp} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, OnDestroy {
  channels: Channel[] = [];
  // @ts-ignore
  selectedChannel: Channel;
  messages: Message[] = [];
  // @ts-ignore
  channelId: number;
  // @ts-ignore
  user: User;
  userId?: number;


  constructor(private channelService: ChannelService, private userService: UserService,
              public websocketService: WebsocketService, private masterService: MasterService) {
     this.masterService.currentChannel.subscribe(id => this.channelId = id);
  }

  ngOnInit(): void {
    this.masterService.currentUser.subscribe(
      (id) => {
        this.userId = id;
      }
    );

    this.userService.findById(this.userId).subscribe(
      (data: User) => {
        this.user = data;
      }
    );

    this.channelService.findById(this.channelId).subscribe(
      (data: Channel) => {
        this.selectedChannel = data;
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
    this.initializeChannels(this.channelId);

  }

  ngOnDestroy(): void {
    this.websocketService.closeWebSocket();
  }

  initializeChannels(id: number): void {
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
    /*const testChannel: Channel = {name: 'testChannel', messages: this.selectedChannel?.messages};
    this.channelService.createChannel(testChannel).subscribe();*/
    console.log('testing');
  }

  testlog(): void {
    console.log(this.getCurrentTime());
  }

  getCurrentTime(): string {
    const today = new Date();
    return ('0' + today.getDate()).slice(-2) + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
      today.getFullYear() + ' ' + ('0' + today.getHours()).slice(-2) + ':' + ('0' + today.getMinutes()).slice(-2);
  }

  sendMessage(sendForm: NgForm): void{
    const messageDTO = new MessageDTO(this.user.userName, sendForm.value.messageBody, this.getCurrentTime());
    // tslint:disable-next-line:max-line-length
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    const newMessage: Message = {messageBody: sendForm.value.messageBody, timeStamp: this.getCurrentTime(), senderUserName: this.user.userName, channel: this.selectedChannel};
    // @ts-ignore
    this.channelService.addMessage(newMessage).subscribe();
    // this.channelService.updateChannel(this.selectedChannel?.id, this.selectedChannel).subscribe();
    this.websocketService.sendMessage(messageDTO);
    sendForm.controls.messageBody.reset();
    console.log(this.selectedChannel);
  }

}
