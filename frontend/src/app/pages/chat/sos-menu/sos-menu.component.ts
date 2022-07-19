import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/services/chat.service';
import { InitService } from 'src/app/services/init.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-sos-menu',
  templateUrl: './sos-menu.component.html',
  styleUrls: ['./sos-menu.component.scss'],
})
export class SosMenuComponent implements OnInit {

  closeIcon=faXmark;

  problemsMentee:string[]=[
    "Feeling totaly empty",
    "returning thoughts of suizide and death",
    "Insomnia/sleep disturbance",
    "Other",
  ];
  problemsPeer:string[]=[
    "My mentee needs professional help",
    "Other",
  ];
  selectedProblemInd:number=0;

  constructor(private chatService:ChatService,private initService:InitService,private navigationService:NavigationService) { }

  ngOnInit() {}

  close():void{
    this.chatService.sosMenuIsOpen=false;
    this.navigationService.showNav=true;
  }

  getProblems():string[]{
    return this.initService.userdata.isMentee? this.problemsMentee:this.problemsPeer;
  }
}
