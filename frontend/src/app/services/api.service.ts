import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userdata } from '../models/userdata';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server: string = "https://bouba.io";
  constructor(private httpClient: HttpClient) { }

  loadUserdata(nickname:string,password:string): Observable<Userdata> {
    return this.httpClient.post<Userdata>(`${this.server}/api/loadUserdata.php`,{nickname:nickname,password:password});
  }
  
  uploadFile(fileData:any): Observable<string> {
    console.log("Message Sent!", fileData);
    return this.httpClient.post<string>(`${this.server}/api/uploadFile.php`, fileData);
  }
  verifyUserdata(userdata:Userdata): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.server}/api/verifyUserdata.php`,userdata);
  }
  updateUserdata(userdata:Userdata): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.server}/api/updateUserdata.php`,userdata);
  }
}
