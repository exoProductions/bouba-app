import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstTimePageRoutingModule } from './first-time-routing.module';

import { FirstTimePage } from './first-time.page';
import { SwiperModule } from 'swiper/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstTimePageRoutingModule,
    SwiperModule,
    FontAwesomeModule,
  ],
  declarations: [FirstTimePage]
})
export class FirstTimePageModule { }
