import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { SettingsPeerComponent } from './settings-peer/settings-peer.component';
import { SettingsMenteeComponent } from './settings-mentee/settings-mentee.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    FontAwesomeModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    SettingsPage,
    SettingsPeerComponent,
    SettingsMenteeComponent,
  ],
})
export class SettingsPageModule { }
