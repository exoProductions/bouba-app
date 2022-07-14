import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Userdata } from '../models/userdata';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  userdata: Userdata = {
    nickname: "",
    password: "",
    description: "",
    preferedPeers: "",
  }

  isFirstTime: boolean = false;
  homeIsLoaded: boolean = true; //has to be false
  constructor(private storageService: StorageService, private apiService: ApiService,private router: Router) {
    this.initHome();
   }

  initHome(): void {
    this.storageService.getData(0, "nickname").subscribe(nickname => {
      this.userdata.nickname = nickname == null || nickname == "" ? "" : nickname; //uncomment
      if (this.userdata.nickname.length == 0) {
        this.isFirstTime = true;
        this.router.navigate(["./First-time"]);
      } else {
        this.storageService.getData(0, "password").subscribe(password => {
          this.userdata.password = password == null || password == "" ? "" : password; //uncomment
          if (this.userdata.password.length != 0) {
            this.loadUserdata();
          }else{
            this.isFirstTime = true;
          }
        });
      }
    });
  }

  loadUserdata(): void {
    this.apiService.loadUserdata(this.userdata.nickname,this.userdata.password).subscribe((userdata: Userdata) => {
      this.userdata=userdata;
      this.homeIsLoaded = true;
    });
  }

}
