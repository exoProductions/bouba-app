import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { SosMenuComponent } from './sos-menu/sos-menu.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    FontAwesomeModule,
    SharedModule,
  ],
  declarations: [
    ChatPage,
    ChatViewComponent,
    ChatMenuComponent,
    SosMenuComponent,
  ]
})
export class ChatPageModule {}
