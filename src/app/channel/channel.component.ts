import {Component, OnDestroy, OnInit} from '@angular/core';
import { Channel } from '../models/channel';
import { ChannelService } from '../services/channel.service';
import {MessageDTO} from '../models/messageDTO';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {WebsocketService} from '../services/websocket.service';
import {NgForm} from '@angular/forms';
import {Message} from '../models/message';
import {MasterService} from '../services/master.service';


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
    const messageDTO = new MessageDTO(sendForm.value.messageBody, this.getCurrentTime(), this.user.userName, this.user.profilePicture);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    const newMessage: Message = {messageBody: sendForm.value.messageBody, timeStamp: this.getCurrentTime(), senderUserName: this.user.userName, senderPic: this.user.profilePicture, channel: this.selectedChannel};
    // @ts-ignore
    this.channelService.addMessage(newMessage).subscribe();
    this.websocketService.sendMessage(messageDTO);
    sendForm.controls.messageBody.reset();
    console.log(this.selectedChannel);
  }

}
