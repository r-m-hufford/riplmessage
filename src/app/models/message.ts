import {Channel} from './channel';

export interface Message {

  messageBody: string;
  timeStamp: string;
  senderUserName: string;
  senderPic: string;
  channel: Channel;
}
