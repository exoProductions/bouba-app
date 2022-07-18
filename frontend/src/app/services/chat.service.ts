import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChatMembers } from '../models/chat-members';
import { Message } from '../models/message';
import { Userdata } from '../models/userdata';
import { ApiService } from './api.service';
import { NavigationService } from './navigation.service';
import { PeerMenteeService } from './peer-mentee.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  toMuchChatsText: string = "";

  homeSelectedChatInd: number = 0;
  chatSelectedChatInd: number = 0;
  chatIsOpen: boolean = true;//todo has to be false
  chatMenuIsOpen: boolean = false;

  chats: ChatMembers[] = [];

  chatMessages: Message[] = [];
  messagesAreLoaded: boolean = false;
  chatsAreLoaded: boolean = false;

  constructor(private apiService: ApiService, private peerMenteeService: PeerMenteeService, private navigationService: NavigationService, private router: Router) { }

  addChat(ind: number, nickname: string, firstNickname: string, password: string, isMentee: boolean,): void {
    this.router.navigate(["./Chat"]);

    if (isMentee) {
      this.homeSelectedChatInd = ind;
      this.navigationService.currentPageInd = 0;
      let peerNickname = this.peerMenteeService.peerList[ind].nickname;
      let peerFirstNickname = this.peerMenteeService.peerList[ind].firstNickname;

      let add: boolean = true;
      console.log(peerNickname);
      for (let i = 0; i < this.chats.length; i++) {
        if (this.chats[i].peerNickname === peerNickname) {
          add = false;
          console.log("now");
          break;
        }
      }

      if (add) {
        if (this.chats.length < 3) {
          this.apiService.addChat(nickname, peerNickname, firstNickname, peerFirstNickname, isMentee).subscribe((worked: boolean) => {
            console.log(worked);
            this.loadChatPage(nickname, password, isMentee);
          });
          this.toMuchChatsText = "";
        } else {
          this.toMuchChatsText = "Buy premium to have more than 2 chats"
        }
      }
    } else { //is peer
      if (this.chats.length < 3) {
        //attention with first two parameters (first mentee, second peer nickname)
        this.apiService.addChat(this.peerMenteeService.menteeList[ind].nickname, nickname, "", "", isMentee).subscribe((worked: boolean) => {
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
    this.chats = [];
    this.apiService.loadChats(nickname, password, isMentee).subscribe((chatMembers: ChatMembers[]) => {
      if (chatMembers != undefined) {
        chatMembers.length > 0 && chatMembers != null ? this.chats = chatMembers : this.chats = [];
        console.log(this.chats);
        this.chatsAreLoaded = true;
      }
    });
  }

  loadMessages(userdata: Userdata): void {
    let menteeNickname="";
    let peerNickname="";
    if(userdata.isMentee){
      menteeNickname=userdata.nickname;
      peerNickname= this.chats[this.chatSelectedChatInd].peerNickname;
    }else{
      menteeNickname= this.chats[this.chatSelectedChatInd].menteeNickname;
      peerNickname=userdata.nickname;
    }
    this.apiService.loadMessages(menteeNickname,peerNickname, userdata.password, userdata.isMentee).subscribe((messages: Message[]) => {
      if (messages != undefined) {
        this.chatMessages = messages;
        this.messagesAreLoaded=true;
        //console.log(this.chatMessages);
      } else {
        this.chatMessages = [];
        this.messagesAreLoaded=false;
      }
    });
  }

  sendMessage(userdata: Userdata, message: string): void {
    console.log(this.chats[this.chatSelectedChatInd].peerNickname);
    //console.log(message);
    let menteeNickname="";
    let peerNickname="";
    if(userdata.isMentee){
      menteeNickname=userdata.nickname;
      peerNickname= this.chats[this.chatSelectedChatInd].peerNickname;
    }else{
      menteeNickname= this.chats[this.chatSelectedChatInd].menteeNickname;
      peerNickname=userdata.nickname;
    }

    this.apiService.sendMessage(menteeNickname,peerNickname, userdata.password, message, userdata.isMentee).subscribe((worked: boolean) => {
      console.log(worked);
      if (worked) {
        let msg: Message = {
          ID: 0,
          menteeNickname: menteeNickname,
          peerNickname: peerNickname,
          message: message,
          isFromMentee: userdata.isMentee,
        }
        this.chatMessages.push(msg);
      }
    });
  }

}
