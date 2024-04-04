import { Component } from '@angular/core';
import { HeaderBannerComponent } from "../header-banner/header-banner.component";
import { TrendingListComponent } from '../trending-list/trending-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-generated-songs',
  standalone: true,
  imports: [HeaderBannerComponent,TrendingListComponent,RouterLink],
  templateUrl: './generated-songs.component.html',
  styleUrl: './generated-songs.component.css'
})
export class GeneratedSongsComponent {

}
