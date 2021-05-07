import {Component, OnInit} from '@angular/core';
import {WebsocketService} from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'riplFrontEnd';

  webSocketService: WebsocketService;
  greeting: any;
  name: string;

  ngOnInit() {
    this.webSocketService = new WebsocketService(new AppComponent());
  }

  connect(){
    this.webSocketService._connect();
  }

  disconnect(){
    this.webSocketService._disconnect();
  }

  sendMessage(){
    this.webSocketService._send(this.name);
  }

  handleMessage(message){
    this.greeting = message;
  }
}
