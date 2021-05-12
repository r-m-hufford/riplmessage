import {Channel} from './channel';
import {DirectMessage} from './direct-messages';

export interface User {
  id: number;
  name: string;
  userName: string;
  password: string;
  email: string;
  profilePicture: string;
  channelList: Channel[];
  directMessages: DirectMessage[];
}
