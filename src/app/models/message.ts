import {Channel} from './channel';

export interface Message {

  messageBody: string;
  senderId: number;
  channel: Channel;
}
