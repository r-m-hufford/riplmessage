import {Channel} from './channel';

export interface Message {

  messageBody: string;
  senderUserName: string;
  channel: Channel;
}
