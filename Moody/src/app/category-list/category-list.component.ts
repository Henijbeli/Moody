import { Component } from '@angular/core';
import { HeaderBannerComponent } from "../header-banner/header-banner.component";
import { TrendingListComponent } from '../trending-list/trending-list.component';
import { RouterLink } from '@angular/router';
import { GeneratedsongsService } from '../services/generatedsongs.service';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone:true,
  imports:[HeaderBannerComponent,TrendingListComponent,RouterLink,NgFor,NgStyle],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categoryListTypes=[
    {
        title:"POP",
        path:"../../assets/img/image1.JPG",
        background_color:"#006450"
    },
    {
        title:"K-POP",
        path:"../../assets/img/image2.jpg",
        background_color:"#1E3264"
    },
    {
        title:"DRILL",
        path:"../../assets/img/image3.JPG",
        background_color:"#8400E7"
    },
    {
        title:"CLASSIC",
        path:"../../assets/img/image4.JPG",
        background_color:"#D84000"
    },
    {
        title:"JAZZ",
        path:"../../assets/img/image5.JPG",
        background_color:"#E1118C"
    },
    {
        title:"ROCK",
        path:"../../assets/img/image6.JPG",
        background_color:"#0D73EC"
    },
    {
        title:"HIP-HOP",
        path:"../../assets/img/image6.JPG",
        background_color:"#2D46B9"
    },
    {
        title:"METAL",
        path:"../../assets/img/image8.JPG",
        background_color:"#503750"
    },
    {
        title:"COUNTRY",
        path:"../../assets/img/image9.JPG",
        background_color:"#E8115B"
    }
]


constructor(public categoryList:GeneratedsongsService){
}
setType(choice:string){
    this.categoryList.collectingSongType("category",choice);
    console.log(this.categoryList.songType[0])
}

}
