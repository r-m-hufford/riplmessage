import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrls: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.userUrls = 'http://localhost:8080/User';
    this.headers = new HttpHeaders({'Content-Type' : 'application/json'});
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrls + `/findAll`);
  }

  public findById(id: number | undefined): Observable<User> {
    return this.http.get<User>(this.userUrls + `/findOne/${id}`);
  }

  public findByName(name: string, password: string): Observable<User>{
    return this.http.get<User>(this.userUrls + `/findName/${name}/${password}`);
  }

  public createUser(user: User): Observable<User>{
    return this.http.post<User>(this.userUrls, user, {headers: this.headers});
  }

  public updateUser(user: User, id: number): Observable<User>{
    return this.http.put<User>(this.userUrls + `/updateUser/${id}`, user);
  }

  public deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.userUrls + `/${id}`);
  }

/*  public userChannels(id: number): Observable<Channel[]> {
    return this.http.get<User>(this.userUrls + `/getchannels/${id}`);
  }*/
}
