import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitService } from 'src/app/services/init.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { faComments, faNewspaper, faHome, faUsers, } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {


  icons: any[] = [
    faComments,
    faHome,
    faNewspaper,
    faUsers,
  ];
  constructor(private ns: NavigationService, private initService: InitService, private router: Router) { }

  ngOnInit() { }

  navigate(ind: number): void {
    this.ns.currentPageInd = ind;

    this.router.navigate(["/" + this.ns.pages[ind]]);
  }
  getCurrentPageInd(): number {
    return this.ns.currentPageInd;
  }
  showFade(): boolean {
    return this.ns.showNavFade;
  }
  showNavbar(): boolean {
    return !this.initService.isFirstTime && this.ns.showNav;
  }
}
