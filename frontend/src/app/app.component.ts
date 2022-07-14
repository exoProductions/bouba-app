import { Component } from '@angular/core';
import { InitService } from './services/init.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private initService:InitService) {}

  getHomeIsLoaded():boolean{
    return this.initService.homeIsLoaded;
  }

}
