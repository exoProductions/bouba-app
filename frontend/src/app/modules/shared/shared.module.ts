import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedHeaderComponent } from './shared-header/shared-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WorkedPopupComponent } from './worked-popup/worked-popup.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SharedHeaderComponent,
    WorkedPopupComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports:[
    NavbarComponent,
    SharedHeaderComponent,
    WorkedPopupComponent,
  ],
})
export class SharedModule { }
