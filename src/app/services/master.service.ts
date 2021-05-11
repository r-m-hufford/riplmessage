import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private userId = new BehaviorSubject<number>(3);
  currentUser = this.userId.asObservable();

  private channelId = new BehaviorSubject<number>(2);
  currentChannel = this.channelId.asObservable();

  constructor() { }

  // tslint:disable-next-line:typedef
  changeUser(id: number) {
    this.userId.next(id);
  }

  // tslint:disable-next-line:typedef
  changeCurrentChannel(id: number | undefined) {
    if (id != null) {
      this.channelId.next(id);
    }
  }

}
