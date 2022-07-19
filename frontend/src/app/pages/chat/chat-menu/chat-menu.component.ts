import { Component, OnInit } from '@angular/core';
import { faCheck, faCross, faTrashAlt, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/services/chat.service';
import { InitService } from 'src/app/services/init.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss'],
})
export class ChatMenuComponent implements OnInit {

  deleteIcon=faTrashAlt;
  closeIcon=faXmark;
  workedIcon=faCheck;

  wantToDelete:boolean=false;



  constructor(private chatService:ChatService,private initService:InitService,private navigationService:NavigationService) { }

  ngOnInit() {}

  delete():void{
    console.log("delete now");
    this.wantToDelete=false;
    this.chatService.deleteChat(this.initService.userdata);
  }

  close():void{
    this.chatService.chatMenuIsOpen=false;
    this.navigationService.showNav=true;
  }

  getDeleteWorked():boolean{
    return this.chatService.deleteChatWorked;
  }

}
