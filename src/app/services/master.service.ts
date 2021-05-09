import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private userId = new BehaviorSubject<number>(0);
  currentUser = this.userId.asObservable();

  constructor() { }

  // tslint:disable-next-line:typedef
  changeUser(id: number) {
    this.userId.next(id);
  }
}
