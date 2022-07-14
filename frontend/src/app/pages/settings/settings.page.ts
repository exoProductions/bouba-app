import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
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

  uploadIcon = faUpload;

  userdata: Userdata = {
    nickname: "",
    password: "",
    description: "",
    preferedPeers: "2",
    isMentee: true,
  }
  formErrorText: string = "";

  constructor(private apiService: ApiService, private initService: InitService, private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.currentPageInd = 3;
    this.userdata=this.initService.userdata;
  }

  setPreferedPeers():void{
    
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
        let info = { id: 2, name: 'raja' }
        formData.append('file', file, "blabla.jpg");
        formData.append('id', '2');
        formData.append('tz', new Date().toISOString())
        formData.append('update', '2')
        formData.append('info', JSON.stringify(info))
        this.file_data = formData


        this.apiService.uploadFile(this.file_data).subscribe((path: string) => {
          console.log("uploaded: ", path);
          this.fileUploadWorked = path.length > 0;

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

  submit(): void {
    console.log(this.userdata);
  }

}
