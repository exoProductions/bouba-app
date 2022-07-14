import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { faHandshakeAngle, faHeart, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { InitService } from 'src/app/services/init.service';
import Swiper, { Pagination, SwiperOptions } from 'swiper';

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.page.html',
  styleUrls: ['./first-time.page.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FirstTimePage implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    pagination: true,
    scrollbar: { draggable: true },
  };

  heartIcon=faHeart;
  iHelpIcon=faHandshakeAngle;
  iNeedHelpIcon=faSeedling;

  constructor( private initService:InitService,private router:Router) { }

  ngOnInit() {
    Swiper.use([Pagination]);
  }
  start(isMentee:boolean):void{
    console.log(isMentee);
    this.initService.userdata.isMentee=isMentee;
    this.initService.isFirstTime=false;
    this.router.navigate(["./Settings"]);
  }
}
