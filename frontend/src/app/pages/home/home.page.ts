import { Component, OnInit } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { delay } from 'rxjs/operators';
import { Mentee } from 'src/app/models/mentee';
import { Peer } from 'src/app/models/peer';
import { InitService } from 'src/app/services/init.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PeerMenteeService } from 'src/app/services/peer-mentee.service';
import Swiper, { Pagination, SwiperOptions } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    pagination: false,
    scrollbar: { draggable: true },
  };

  chatIcon = faComments;

  constructor(private navigationService: NavigationService, private initService: InitService, private peerMenteeService: PeerMenteeService) { }

  ngOnInit() {
    Swiper.use([Pagination]);
    this.navigationService.currentPageInd = 1;
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
    }

  }

}
