import { Component, OnInit } from '@angular/core';
import {MasterService} from '../services/master.service';
import {UserService} from '../services/user.service';


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

  constructor(private masterService: MasterService, private userService: UserService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.findByName(this.username, this.password)
      .subscribe(data => {console.log('test', data); this.masterService.changeUser(data.id); this.id = data.id}, error => {});
  }

}
