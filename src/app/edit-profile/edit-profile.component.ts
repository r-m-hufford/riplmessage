import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MasterService} from '../services/master.service';
import {User} from '../models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  // @ts-ignore
  user: User;
  // @ts-ignore
  id: number;
  // @ts-ignore
  name: string;
  // @ts-ignore
  userName: string;
  // @ts-ignore
  password: string;
  // @ts-ignore
  email: string;
  // @ts-ignore
  profilePicture: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private masterService: MasterService, private userService: UserService) { }

  ngOnInit(): void {
  this.masterService.currentUser.subscribe(id => this.id = id);

  this.masterService.currentUser.subscribe(id => {
      this.userService.findById(id)
        .subscribe((data: User) => {
          this.user = data;
        });
    });
  }

  onYesClick(): void {
    if (this.name != null) {
      this.user.name = this.name;
    }
    if (this.userName != null) {
      this.user.userName = this.userName;
    }
    if (this.email != null) {
      this.user.email = this.email;
    }
    if (this.password != null) {
      this.user.password = this.password;
    }
    if (this.profilePicture != null) {
      this.user.profilePicture = this.profilePicture;
    }
    this.userService.updateUser(this.user, this.id).subscribe();
  }
}
