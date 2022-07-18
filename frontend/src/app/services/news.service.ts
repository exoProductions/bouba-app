import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { Userdata } from '../models/userdata';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: News[] = [
    {
      title: "Sigmund Freud",
      subTitle: "Das Ich und das Es",
      imgTitle: "news0.jpg",
      isLarge:false,
      link:"https://www.orellfuessli.ch/shop/home/artikeldetails/A1045249266?ProvID=10917735&gclid=Cj0KCQjwidSWBhDdARIsAIoTVb2Gw7rGoLLVcqit4-L_G_TEuf4yPc_VPQgETuC7HZxzlSGn9n0vOGMaApuoEALw_wcB&gclsrc=aw.ds"
    },
    {
      title: "Bob Ross",
      subTitle: "A case study",
      imgTitle: "news1.jpg",
      isLarge:false,
      link:"https://www.orellfuessli.ch/shop/home/artikeldetails/A1045249266?ProvID=10917735&gclid=Cj0KCQjwidSWBhDdARIsAIoTVb2Gw7rGoLLVcqit4-L_G_TEuf4yPc_VPQgETuC7HZxzlSGn9n0vOGMaApuoEALw_wcB&gclsrc=aw.ds"
    },
    {
      title: "Glück im Leben",
      subTitle: "I ill take some magic hite, and a little bit of Vandyke bron and a little touch of yello.",
      imgTitle: "news2.jpg",
      isLarge:false,
      link:"https://www.orellfuessli.ch/shop/home/artikeldetails/A1045249266?ProvID=10917735&gclid=Cj0KCQjwidSWBhDdARIsAIoTVb2Gw7rGoLLVcqit4-L_G_TEuf4yPc_VPQgETuC7HZxzlSGn9n0vOGMaApuoEALw_wcB&gclsrc=aw.ds"
    },
    {
      title: "Interesting Quotes",
      subTitle: "Talent is a pursued interest. That is to say, anything you practice you can do.",
      imgTitle: "news3.jpg",
      isLarge:false,
      link:"https://www.orellfuessli.ch/shop/home/artikeldetails/A1045249266?ProvID=10917735&gclid=Cj0KCQjwidSWBhDdARIsAIoTVb2Gw7rGoLLVcqit4-L_G_TEuf4yPc_VPQgETuC7HZxzlSGn9n0vOGMaApuoEALw_wcB&gclsrc=aw.ds"
    },
    {
      title: "The Nature",
      subTitle: "The might of the nature in its full beauty",
      imgTitle: "news4.jpg",
      isLarge:true,
      link:"https://www.orellfuessli.ch/shop/home/artikeldetails/A1045249266?ProvID=10917735&gclid=Cj0KCQjwidSWBhDdARIsAIoTVb2Gw7rGoLLVcqit4-L_G_TEuf4yPc_VPQgETuC7HZxzlSGn9n0vOGMaApuoEALw_wcB&gclsrc=aw.ds"
    },
  ];

  constructor(private apiService: ApiService) {

  }

  loadNews(userdata: Userdata): void {
    this.apiService.loadNews(userdata.isMentee).subscribe((news: News[]) => {
      if (news != undefined && news != null) {
        this.news = news
        console.log(this.news);
      }
    });
  }

}
