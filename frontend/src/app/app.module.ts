import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { HomePageModule } from './pages/home/home.module';
import { NewsPageModule } from './pages/news/news.module';
import { SettingsPageModule } from './pages/settings/settings.module';
import { ChatPageModule } from './pages/chat/chat.module';
import { FirstTimePageModule } from './pages/first-time/first-time.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name:"bouba_db",
      driverOrder:[cordovaSQLiteDriver._driver,Drivers.IndexedDB,Drivers.LocalStorage],
    }),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    HomePageModule,
    NewsPageModule,
    SettingsPageModule,
    ChatPageModule,
    FirstTimePageModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
