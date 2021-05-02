import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  channels = ['machine learning', 'sailing', 'python', 'java', 'compiler errors', 'blacksmithing', 'angular'];

  constructor() { }

  ngOnInit(): void {
  }

}
