import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { ChatService } from 'src/app/services/chat.service';
import { InitService } from 'src/app/services/init.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent implements OnInit {

  backIcon=faChevronLeft;

  constructor(private navigationService:NavigationService,private initService:InitService,private apiService:ApiService,private chatService:ChatService) { }

  ngOnInit() {}

  goBack():void{
    this.navigationService.showNav=true;
    this.chatService.chatIsOpen=false;
  }
  getIsMentee():boolean{
    return this.initService.userdata.isMentee;
  }

  getIsLoaded():boolean{
    return this.initService.chatsAreLoaded;
  }

  getPartnerName():string{
    if(this.getIsMentee()){
      return this.chatService.chats[this.chatService.chatSelectedChatInd].peerNickname
    }else{
      return this.chatService.chats[this.chatService.chatSelectedChatInd].menteeNickname;
    }
  }

}
