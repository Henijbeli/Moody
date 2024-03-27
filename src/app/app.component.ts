import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { FooterComponent } from "./footer/footer.component";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ArtistPlaceComponent } from './artist-place/artist-place.component';
import { HeaderBannerComponent } from './header-banner/header-banner.component';
import { TrendingListComponent } from './trending-list/trending-list.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavBarComponent, FooterComponent]
})
export class AppComponent {
  title = 'Moody';
}
