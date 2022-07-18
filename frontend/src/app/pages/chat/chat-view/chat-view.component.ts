import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft, faLocationArrow, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Message } from 'src/app/models/message';
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

  @ViewChild('chatContainer') private chatContainer: ElementRef;

  message: string = "";
  backIcon = faChevronLeft;
  sendIcon = faLocationArrow;

  scrolledOnce:boolean=false;

  constructor(private navigationService: NavigationService, private initService: InitService, private apiService: ApiService, private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.chatMessages=[];
    this.poll();
  }

  poll(): void {
    if (this.chatService.chatIsOpen) {
      setTimeout(() => {
       
        this.chatService.loadMessages(this.initService.userdata);
        if(!this.scrolledOnce && this.chatService.messagesAreLoaded){
          this.scrollToBottom();
          this.scrolledOnce=true;
          console.log("naöksdfjöaksdfja sdkf");
        }
        this.poll();
      }, 2000);
    }
  }

  goBack(): void {
    this.navigationService.showNav = true;
    this.chatService.chatIsOpen = false;
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.initService.userdata, this.message);
    this.message = "";
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getIsMentee(): boolean {
    return this.initService.userdata.isMentee;
  }

  getIsLoaded(): boolean {
    return this.chatService.chatsAreLoaded;
  }

  getMessages(): Message[] {
    return this.chatService.chatMessages;
  }

  getPartnerName(): string {
    if (this.getIsMentee()) {
      return this.chatService.chats[this.chatService.chatSelectedChatInd].peerNickname
    } else {
      return this.chatService.chats[this.chatService.chatSelectedChatInd].menteeNickname;
    }
  }

  getIsRight(message: Message): boolean {
    let isRight: boolean = false;
    if (this.getIsMentee()) {
      if (message.isFromMentee) {
        isRight = true;
      }
    } else {
      if (!message.isFromMentee) {
        isRight = true;
      }
    }
    return isRight;
  }
  showSpacer(ind: number): boolean {
    let show: boolean = false;
    if (ind == 0) {
      show = true;
    } else {
      if ((this.getMessages()[ind].isFromMentee && !this.getMessages()[ind - 1].isFromMentee) || (!this.getMessages()[ind].isFromMentee && this.getMessages()[ind - 1].isFromMentee)) {
        return true;
      }
    }
    return show;
  }

}
