import { Component, OnInit } from '@angular/core';
import {MasterService} from '../services/master.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  id: number;
  username = '';
  password = '';

  constructor(private masterService: MasterService) { }

  ngOnInit(): void {
    this.masterService.currentUser.subscribe( id => this.id = id);
  }

  login(): void {
    this.masterService.changeUser(this.id);
  }

}
