import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Channel } from './channel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private channelUrls: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.channelUrls = 'http://localhost:8080/Channel';
    this.headers = new HttpHeaders({'Content-Type' : 'application/json'});
  }

  public findAll(): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.channelUrls);
  }

  public findById(id: number): Observable<Channel> {
    return this.http.get<Channel>(this.channelUrls + `/${id}`);
  }

  public createChannel(channel: Channel): Observable<Channel> {
    return this.http.post<Channel>(this.channelUrls, channel, {headers: this.headers});
  }

  public updateChannel(id: number | undefined, channel: Channel | undefined): Observable<Channel> {
    return this.http.put<Channel>(this.channelUrls + `/${id}`, channel);
  }

  public deleteChannel(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.channelUrls + `/${id}`);
  }

}
