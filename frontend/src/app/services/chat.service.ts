import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChatMembers } from '../models/chat-members';
import { ApiService } from './api.service';
import { InitService } from './init.service';
import { PeerMenteeService } from './peer-mentee.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  toMuchChatsText: string = "Buy premium to have more than 2 chats";

  homeSelectedChatInd: number = 0;
  chats: ChatMembers[] = [];

  constructor(private apiService: ApiService, private peerMenteeService: PeerMenteeService, private router: Router) { }

  addChat(ind: number, nickname: string, password, isMentee: boolean,): void {
    this.homeSelectedChatInd = ind;
    this.router.navigate(["./Chat"]);
    let partnerNickname = isMentee ? this.peerMenteeService.peerList[ind].nickname : this.peerMenteeService.menteeList[ind].nickname;
    let add: boolean = true;
    console.log(partnerNickname);
    for (let i = 0; i < this.chats.length; i++) {
      console.log(this.chats[i].partnerNickname);
      if (this.chats[i].partnerNickname === partnerNickname) {
        add = false;
        console.log("now");
        break;
      }
    }
    if (add) {
      if (this.chats.length < 3) {
        console.log(nickname);
        this.apiService.addChat(nickname, this.peerMenteeService.peerList[ind].nickname, isMentee).subscribe((worked: boolean) => {
          console.log(worked);
          this.loadChatPage(nickname, password, isMentee);
        });
        this.toMuchChatsText = "";
      } else {
        this.toMuchChatsText = "Buy premium to have more than 2 chats"
      }
    }
  }

  loadChatPage(nickname: string, password: string, isMentee: boolean): void {
    this.apiService.loadChats(nickname, password, isMentee).subscribe((chatMembers: ChatMembers[]) => {
      if(chatMembers !=undefined){
        chatMembers.length > 0 && chatMembers != null ? this.chats = chatMembers : this.chats = [];
        console.log(this.chats);
      }

    });
  }
}
