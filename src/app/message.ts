import {Channel} from './channel';
import {DirectMessage} from './direct-messages';

export interface Message {
  msgId?: number;
  messageBody?: string;
  timeStamp?: Date;
  senderId?: number;
  channel?: Channel;
  directMessage?: DirectMessage;
}
