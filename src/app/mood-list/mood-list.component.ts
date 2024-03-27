import { Component } from '@angular/core';
import { HeaderBannerComponent } from "../header-banner/header-banner.component";
import { TrendingListComponent } from '../trending-list/trending-list.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-mood-list',
    standalone: true,
    templateUrl: './mood-list.component.html',
    styleUrl: './mood-list.component.css',
    imports: [HeaderBannerComponent,TrendingListComponent,RouterLink]
})
export class MoodListComponent {

}
