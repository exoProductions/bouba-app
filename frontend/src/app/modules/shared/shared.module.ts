import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedHeaderComponent } from './shared-header/shared-header.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SharedHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavbarComponent,
    SharedHeaderComponent,
    
  ],
})
export class SharedModule { }
