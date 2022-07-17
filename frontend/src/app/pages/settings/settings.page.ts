import { Component, OnInit } from '@angular/core';
import { faPen, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Userdata } from 'src/app/models/userdata';
import { ApiService } from 'src/app/services/api.service';
import { InitService } from 'src/app/services/init.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  fileName = '';
  file_data: any = ''

  fileUploadWorked: boolean = false;
  fileUploaded: boolean = false;
  showProfile: boolean = true;

  uploadIcon = faPen;

  userdata: Userdata = {
    nicknameChanged: false,
    oldNickname: "",
    firstNickname: "",
    nickname: "",
    password: "",
    description: "",
    preferedPeers: "2",
    isMentee: true,
    age: 0,
    gender: "Male",
    language: "Deutsch",
  }
  formErrorText: string = "";

  showWorked: boolean = false;

  constructor(private apiService: ApiService, private initService: InitService, private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.currentPageInd = 3;
    setTimeout(() => {
      if (this.initService.userdata.nickname.length > 0) {
        this.userdata = JSON.parse(JSON.stringify(this.initService.userdata));
      }
    }, 1000);
    this.navigationService.showNavFade = true;
  }

  setPreferedPeers(): void {

  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      //get file information such as name, size and type
      console.log('finfo', file.name, file.size, file.type);
      //max file size is 4 mb
      if ((file.size / 1048576) <= 10) {
        let formData = new FormData();
        console.log();
        let imgName=this.initService.userdata.firstNickname.length==0?this.initService.userdata.nickname:this.initService.userdata.firstNickname;
        let info = { id: 2, name: 'raja' }
        formData.append('file', file, imgName + ".jpg");
        formData.append('id', '2');
        formData.append('tz', new Date().toISOString())
        formData.append('update', '2')
        formData.append('info', JSON.stringify(info))
        this.file_data = formData


        this.apiService.uploadFile(this.file_data).subscribe((path: string) => {
          console.log("uploaded: ", path);
          this.fileUploadWorked = path.length > 0;
          this.showProfile=false;
          setTimeout(()=>{
            this.showProfile=true;
          },500);
          this.fileUploaded = true;
        });
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }


  getIsMentee(): boolean {
    return this.initService.userdata.isMentee;
  }

  getNicknameIsSet(): boolean {
    return this.initService.userdata.nickname.length > 0;
  }

  submit(firstTime: boolean): void {
    console.log(this.userdata);
    if (this.userdata.nickname.length > 0) {
      this.apiService.verifyUserdata(this.userdata).subscribe((worked: boolean) => {
        if (worked) {
          this.initService.userdata = JSON.parse(JSON.stringify(this.userdata));
          this.formErrorText = "";
          this.userdata.password="insecure";
          this.initService.setUserdataLocal();
        } else {
          this.formErrorText = "This nickname already exists!";
        }
      });
    }
  }

  update(): void {
    console.log(this.userdata);
    if (this.userdata.nickname.length > 0) {
      console.log(this.userdata.nickname, this.initService.userdata.nickname);
      if (this.userdata.nickname === this.initService.userdata.nickname) {
        this.userdata.nicknameChanged = false;
      } else {
        this.userdata.oldNickname = JSON.parse(JSON.stringify(this.initService.userdata)).nickname;
        this.userdata.nicknameChanged = true;
        console.log(this.userdata.oldNickname);
      }
      console.log(this.userdata.nicknameChanged);
      this.apiService.updateUserdata(this.userdata).subscribe((worked: boolean) => {
        if (worked) {
          this.initService.userdata = JSON.parse(JSON.stringify(this.userdata));
          console.log(this.userdata);
          this.formErrorText = "";
          this.initService.setUserdataLocal();
          this.showWorked = true;
          this.initService.loadPeersAndMentees();
          setTimeout(() => {
            this.showWorked = false;
          }, 2000);
        } else {
          this.formErrorText = "This nickname already exists!";
        }
        console.log(worked);
      });
    }
  }



  getProfilePicture(): string {
    let imgName=this.initService.userdata.firstNickname.length==0?this.initService.userdata.nickname:this.initService.userdata.firstNickname;
    return imgName + ".jpg";
  }
  getHomeIsLoaded(): boolean {
    return this.initService.homeIsLoaded;
  }


}
