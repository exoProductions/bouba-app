import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  pages:string[]=["Chat","Home","News","Settings"]
  currentPageInd:number=0;
  showNavFade:boolean=false;
  showNav:boolean=false;//todo has to be true
  constructor() { }
}
