import { Component } from '@angular/core';
import { HeaderBannerComponent } from "../header-banner/header-banner.component";
import { TrendingListComponent } from '../trending-list/trending-list.component';
import { RouterLink } from '@angular/router';
import { GeneratedsongsService } from '../services/generatedsongs.service';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-thempo-list',
  standalone: true,
  imports: [HeaderBannerComponent,TrendingListComponent,RouterLink,NgFor,NgStyle],
  templateUrl: './tempo-list.component.html',
  styleUrl: './tempo-list.component.css'
})
export class ThempoListComponent {
  tempoListTypes=[
    {
        title:"FAST",
        path:"../../assets/img/image1.JPG",
        background_color:"#006450"
    },
    {
        title:"MODERATE",
        path:"../../assets/img/image2.jpg",
        background_color:"#1E3264"
    },
    {
        title:"SLOW",
        path:"../../assets/img/image3.JPG",
        background_color:"#8400E7"
    },
    {
        title:"VARIED",
        path:"../../assets/img/image4.JPG",
        background_color:"#D84000"
    }
]

constructor(public tempoList:GeneratedsongsService){
}
setType(choice:string){
    this.tempoList.collectingSongType("tempo",choice);
    console.log(this.tempoList.songType[0])
}

}
