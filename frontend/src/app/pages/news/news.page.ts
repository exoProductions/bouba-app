import { Component, OnInit } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { News } from 'src/app/models/news';
import { NavigationService } from 'src/app/services/navigation.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  rightIcon=faChevronRight;

  constructor(private navigationService:NavigationService,private newsService:NewsService) { }

  ngOnInit() {
    this.navigationService.currentPageInd=2;
    this.navigationService.showNavFade=true;
  }

  openNews(ind:number):void{
  window.open(this.getNews()[ind].link,"_blank");
  }

  getNews():News[]{
    return this.newsService.news;
  }

}
