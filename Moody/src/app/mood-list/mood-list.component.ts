import { Component } from '@angular/core';
import { HeaderBannerComponent } from "../header-banner/header-banner.component";
import { TrendingListComponent } from '../trending-list/trending-list.component';
import { RouterLink } from '@angular/router';
import { GeneratedsongsService } from '../services/generatedsongs.service';
import { NgFor, NgStyle } from '@angular/common';

@Component({
    selector: 'app-mood-list',
    standalone: true,
    templateUrl: './mood-list.component.html',
    styleUrl: './mood-list.component.css',
    imports: [HeaderBannerComponent,TrendingListComponent,RouterLink,NgFor,NgStyle]
})
export class MoodListComponent {
    moodListTypes=[
        {
            title:"SAD",
            path:"../../assets/img/image1.JPG",
            background_color:"#006450"
        },
        {
            title:"HAPPY",
            path:"../../assets/img/image2.jpg",
            background_color:"#1E3264"
        },
        {
            title:"ANGRY",
            path:"../../assets/img/image3.JPG",
            background_color:"#8400E7"
        },
        {
            title:"MOTIVATED",
            path:"../../assets/img/image4.JPG",
            background_color:"#D84000"
        },
        {
            title:"NOSTALGIC",
            path:"../../assets/img/image5.JPG",
            background_color:"#E1118C"
        },
        {
            title:"CALM",
            path:"../../assets/img/image6.JPG",
            background_color:"#0D73EC"
        },
        {
            title:"ROMANTIC",
            path:"../../assets/img/image6.JPG",
            background_color:"#2D46B9"
        },
        {
            title:"RELAXED",
            path:"../../assets/img/image8.JPG",
            background_color:"#503750"
        },
        {
            title:"CONFIDENT",
            path:"../../assets/img/image9.JPG",
            background_color:"#E8115B"
        }
    ]

    constructor(public MoodType:GeneratedsongsService){}
    
    setType(choice:string){
        this.MoodType.collectingSongType("mood",choice);
        console.log(this.MoodType.songType[0])
    }

}
