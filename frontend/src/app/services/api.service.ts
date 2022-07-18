import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMembers } from '../models/chat-members';
import { Mentee } from '../models/mentee';
import { Message } from '../models/message';
import { News } from '../models/news';
import { Peer } from '../models/peer';
import { Userdata } from '../models/userdata';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server: string = "https://bouba.io";
  constructor(private httpClient: HttpClient) { }

  loadUserdata(nickname: string, password: string): Observable<Userdata> {
    return this.httpClient.post<Userdata>(`${this.server}/api/loadUserdata.php`, { nickname: nickname, password: password });
  }
  loadPeers(nickname: string, password: string): Observable<Peer[]> {
    return this.httpClient.post<Peer[]>(`${this.server}/api/loadPeers.php`, { nickname: nickname, password: password });
  }
  loadMentees(nickname: string, password: string): Observable<Mentee[]> {
    return this.httpClient.post<Mentee[]>(`${this.server}/api/loadMentees.php`, { nickname: nickname, password: password });
  }

  uploadFile(fileData: any): Observable<string> {
    console.log("Message Sent!", fileData);
    return this.httpClient.post<string>(`${this.server}/api/uploadFile.php`, fileData);
  }
  verifyUserdata(userdata: Userdata): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.server}/api/verifyUserdata.php`, userdata);
  }
  updateUserdata(userdata: Userdata): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.server}/api/updateUserdata.php`, userdata);
  }

  addChat(menteeNickname: string, peerNickname: string, firstNicknameMentee: string, firstNicknamePeer: string, isMentee: boolean): Observable<boolean> {
    console.log(firstNicknameMentee, firstNicknamePeer);
    return this.httpClient.post<boolean>(`${this.server}/api/addChat.php`, { menteeNickname: menteeNickname, peerNickname: peerNickname, firstNicknameMentee: firstNicknameMentee, firstNicknamePeer: firstNicknamePeer, isMentee: isMentee });
  }

  loadChats(nickname: string, password: string, isMentee: boolean): Observable<ChatMembers[]> {
    console.log(nickname, isMentee);
    return this.httpClient.post<ChatMembers[]>(`${this.server}/api/loadChats.php`, { nickname: nickname, password: password, isMentee: isMentee });
  }

  loadMessages(menteeNickname: string, peerNickname: string, password: string, isMentee: boolean): Observable<Message[]> {
    return this.httpClient.post<Message[]>(`${this.server}/api/loadMessages.php`, { menteeNickname: menteeNickname, peerNickname: peerNickname, password: password, isMentee: isMentee });
  }
  sendMessage(menteeNickname: string, peerNickname: string, password: string, message: string, isMentee: boolean): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.server}/api/sendMessage.php`, { menteeNickname: menteeNickname, peerNickname: peerNickname, password: password, message: message, isMentee: isMentee });
  }

  loadNews(isMentee: boolean): Observable<News[]> {
    return this.httpClient.post<News[]>(`${this.server}/api/loadNews.php`, { isMentee: isMentee });
  }

}
