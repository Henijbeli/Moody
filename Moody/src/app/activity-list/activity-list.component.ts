import { Component } from '@angular/core';
import { HeaderBannerComponent } from "../header-banner/header-banner.component";
import { TrendingListComponent } from '../trending-list/trending-list.component';
import { RouterLink } from '@angular/router';
import { GeneratedsongsService } from '../services/generatedsongs.service';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [HeaderBannerComponent,TrendingListComponent,RouterLink,NgFor,NgStyle],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})
export class ActivityListComponent {
  activityListTypes=[
    {
        title:"STUDYING",
        path:"../../assets/img/image1.JPG",
        background_color:"#006450"
    },
    {
        title:"DNACING",
        path:"../../assets/img/image2.jpg",
        background_color:"#1E3264"
    },
    {
        title:"TRAINING",
        path:"../../assets/img/image3.JPG",
        background_color:"#8400E7"
    },
    {
        title:"DRIVING",
        path:"../../assets/img/image4.JPG",
        background_color:"#D84000"
    },
    {
        title:"WALKING",
        path:"../../assets/img/image5.JPG",
        background_color:"#E1118C"
    },
    {
        title:"CHILLING",
        path:"../../assets/img/image6.JPG",
        background_color:"#0D73EC"
    },
    {
        title:"PLAYING",
        path:"../../assets/img/image6.JPG",
        background_color:"#2D46B9"
    },
    {
        title:"READING",
        path:"../../assets/img/image8.JPG",
        background_color:"#503750"
    },
    {
        title:"PAINTING",
        path:"../../assets/img/image9.JPG",
        background_color:"#E8115B"
    }
]


constructor(public activityList:GeneratedsongsService){
}
setType(choice:string){
    this.activityList.collectingSongType("activity",choice);
    console.log(this.activityList.songType[0])
}

}
