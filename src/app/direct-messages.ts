import {User} from './user';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';

export interface DirectMessage {
  id: number;
  name: string;
  users: User[];
  messages: Message[];
}
