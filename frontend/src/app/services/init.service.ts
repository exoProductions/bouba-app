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
    nicknameChanged:false,
    oldNickname:"",
    firstNickname:"",
    nickname: "",
    password: "",
    description: "",
    preferedPeers: "1",
    isMentee:true,
    age:0,
    gender:"Male",
    language:"Deutsch",
  }

  isFirstTime: boolean = false;
  homeIsLoaded: boolean = true; //has to be false
  constructor(private storageService: StorageService, private apiService: ApiService,private router: Router) {
    this.initHome();
    setTimeout(()=>{
      //this.storageService.addData(0, "bla", "bli") //has to be false
      //this.storageService.removeItem(1,"nickname");
    },1000);    
   }

  initHome(): void {
    this.storageService.getData(1, "nickname").subscribe(nickname => {
      this.userdata.nickname = nickname == null || nickname == "" ? "" : nickname; //uncomment
      if (this.userdata.nickname.length == 0) {
        //this.isFirstTime = true; //todo uncomment
       // this.router.navigate(["./First-time"]); //todo uncomment
      } else {
        this.storageService.getData(1, "password").subscribe(password => {
          this.userdata.password = password == null || password == "" ? "" : password; //uncomment
          if (this.userdata.password.length != 0) {
            this.loadUserdata();
          }else{
            this.isFirstTime = true;
           // this.router.navigate(["./First-time"]); //todo uncomment
          }
        });
      }
    });
  }

  loadUserdata(): void {
    this.apiService.loadUserdata(this.userdata.nickname,this.userdata.password).subscribe((userdata: Userdata) => {
      this.userdata=userdata;
      console.log(this.userdata);
      this.homeIsLoaded = true;
    });
  }

  
  setUserdataLocal() {
    this.storageService.addData(1, "nickname", this.userdata.nickname) //has to be false
    this.storageService.addData(1, "password", this.userdata.password) //has to be false
    console.log("safed");
  }

}
