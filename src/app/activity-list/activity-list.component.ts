import { Component } from '@angular/core';
import { HeaderBannerComponent } from "../header-banner/header-banner.component";
import { TrendingListComponent } from '../trending-list/trending-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [HeaderBannerComponent,TrendingListComponent,RouterLink],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})
export class ActivityListComponent {

}
