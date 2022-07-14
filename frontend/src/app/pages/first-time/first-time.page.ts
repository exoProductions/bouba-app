import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  constructor() { }

  ngOnInit() {
    Swiper.use([Pagination]);
  }
  start():void{
    
  }
}
