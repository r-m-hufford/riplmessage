import {Channel} from './channel';
import {DirectMessage} from './direct-messages';

export class Message {
  msgId?: number;
  messageBody: string;
  timeStamp?: Date;
  senderId: number;
  channel?: Channel;
  directMessage?: DirectMessage;

  constructor(messageBody: string, senderId: number) {
    this.messageBody = messageBody;
    this.senderId = senderId;
  }
}
