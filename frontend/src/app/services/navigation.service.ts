import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  pages:string[]=["Chat","Home","News","Settings"]
  currentPageInd:number=0;
  constructor() { }
}
