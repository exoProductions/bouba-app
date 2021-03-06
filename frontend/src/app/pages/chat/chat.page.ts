import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faHome } from '@fortawesome/free-solid-svg-icons';
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
  homeIcon=faHome;

  constructor(private chatService:ChatService,private peerMenteeService:PeerMenteeService,private initService:InitService,private navigationService:NavigationService) { }

  ngOnInit() {
    this.navigationService.currentPageInd=0;
    this.navigationService.showNavFade=true;
    console.log(this.initService.userdata);
  }

  openChat(ind:number):void{
    this.chatService.chatSelectedChatInd=ind;
    this.chatService.chatIsOpen=true;
    this.navigationService.showNav=false;
    this.chatService.loadMessages(this.initService.userdata);
  }

  openMenu(ind:number):void{
    this.chatService.chatSelectedChatInd=ind;
    this.chatService.chatMenuIsOpen=true;
    this.navigationService.showNav=false;
  }

  openSOS():void{
    this.chatService.sosMenuIsOpen=true;
    this.navigationService.showNav=false;
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
      return this.chatService.chats[ind].firstNicknamePeer + ".jpg";
    }else{
      return this.chatService.chats[ind].firstNicknameMentee + ".jpg";
    }
  }

  getBuyPremiumText():string{
    return this.chatService.toMuchChatsText;
  }

  getChatIsOpen():boolean{
    return this.chatService.chatIsOpen;
  }
  getChatMenuIsOpen():boolean{
    return this.chatService.chatMenuIsOpen;
  }
  getSosMenuIsOpen():boolean{
    return this.chatService.sosMenuIsOpen;
  }
}
