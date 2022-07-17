import { Component, OnInit } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ChatMembers } from 'src/app/models/chat-members';
import { ChatService } from 'src/app/services/chat.service';
import { InitService } from 'src/app/services/init.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PeerMenteeService } from 'src/app/services/peer-mentee.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  menuIcon=faEllipsisV;

  constructor(private chatService:ChatService,private peerMenteeService:PeerMenteeService,private initService:InitService,private navigationService:NavigationService) { }

  ngOnInit() {
    this.navigationService.currentPageInd=0;
    this.navigationService.showNavFade=true
  }

  getChats():ChatMembers[]{
    return this.chatService.chats;
  }
  getIsMentee(): boolean {
    return this.initService.userdata.isMentee;
  }
  getIsLoaded():boolean{
    return this.initService.chatsAreLoaded;
  }
  getProfilePicture(ind: number): string {
    if (this.getIsMentee()) {
      return this.peerMenteeService.peerList[ind].firstNickname + ".jpg";
    }else{
      console.log(this.peerMenteeService.menteeList[ind].firstNickname);
      return this.peerMenteeService.menteeList[ind].firstNickname + ".jpg";
    }
  }

  getBuyPremiumText():string{
    return this.chatService.toMuchChatsText;
  }
}
