import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userdata } from '../models/userdata';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server: string = "https://www.exo-productions.ch";
  constructor(private httpClient: HttpClient) { }

  loadUserdata(nickname:string,password:string): Observable<Userdata> {
    return this.httpClient.post<Userdata>(`${this.server}/api/bouba/loadUserdata.php`,{nickname:nickname,password:password});
  }

}
