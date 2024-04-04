import { Component } from '@angular/core';
import { HeaderBannerComponent } from "../header-banner/header-banner.component";
import { TrendingListComponent } from '../trending-list/trending-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone:true,
  imports:[HeaderBannerComponent,TrendingListComponent,RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

}
