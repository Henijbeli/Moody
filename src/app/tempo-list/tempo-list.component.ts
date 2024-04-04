import { Component } from '@angular/core';
import { HeaderBannerComponent } from "../header-banner/header-banner.component";
import { TrendingListComponent } from '../trending-list/trending-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-thempo-list',
  standalone: true,
  imports: [HeaderBannerComponent,TrendingListComponent,RouterLink],
  templateUrl: './tempo-list.component.html',
  styleUrl: './tempo-list.component.css'
})
export class ThempoListComponent {

}
