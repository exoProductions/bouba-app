import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faComments, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Mentee } from 'src/app/models/mentee';
import { Peer } from 'src/app/models/peer';
import { ChatService } from 'src/app/services/chat.service';
import { InitService } from 'src/app/services/init.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PeerMenteeService } from 'src/app/services/peer-mentee.service';
import Swiper, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit,AfterViewChecked {

  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;
  @ViewChild('swiper2', { static: false }) swiper2!: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    pagination: false,
    scrollbar: { draggable: true },
  };

  chatIcon = faComments;
  rightIcon=faChevronRight;
  leftIcon=faChevronLeft;
  newsIcon=faNewspaper;

  constructor(private chatService:ChatService,private navigationService: NavigationService, private initService: InitService, private peerMenteeService: PeerMenteeService,private router:Router) { }
  ngAfterViewChecked(): void {
    this.navigationService.currentPageInd = 1;
  }

  ngOnInit() {
    Swiper.use([Pagination]);
    this.navigationService.currentPageInd = 1;
    this.navigationService.showNavFade=true;
  }
  addChat(ind:number):void{
      this.chatService.addChat(ind,this.initService.userdata.nickname,this.initService.userdata.firstNickname,this.initService.userdata.password,this.initService.userdata.isMentee,);
  }

  nextSlide(next:boolean):void{
    if(this.initService.userdata.isMentee){
      next? this.swiper.swiperRef.slideNext(400):this.swiper.swiperRef.slidePrev(400);
    }else{
      next? this.swiper2.swiperRef.slideNext(400):this.swiper2.swiperRef.slidePrev(400);
    }
  }

  getPeerList(): Peer[] {
    return this.peerMenteeService.peerList;
  }
  getMenteeList(): Mentee[] {
    return this.peerMenteeService.menteeList;
  }
  getIsMentee(): boolean {
    return this.initService.userdata.isMentee;
  }
  getProfilePicture(ind: number): string {
    if (this.getIsMentee()) {
      return this.peerMenteeService.peerList[ind].firstNickname + ".jpg";
    }else{
      return this.peerMenteeService.menteeList[ind].firstNickname + ".jpg";
    }
  }

  getShowButtons():boolean{
    if(this.initService.chatsAreLoaded){
      if(this.getIsMentee()){
        if(this.getPeerList().length==0){
          return false;
        }else{
          return true;
        }
      }else{
        if(this.getMenteeList().length==0){
          return false;
        }else{
          return true;
        }
      }
    }
  }

}
