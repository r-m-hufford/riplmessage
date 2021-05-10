import {Channel} from './channel';

export interface Message {

  messageBody: string;
  timeStamp: string;
  senderUserName: string;
  channel: Channel;
}
