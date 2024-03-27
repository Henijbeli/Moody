import { Routes } from '@angular/router';
import { MoodListComponent } from './mood-list/mood-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ArtistPlaceComponent } from './artist-place/artist-place.component';

export const routes: Routes = [  
{path:'',component: MoodListComponent },
{path:'mood-list', component: MoodListComponent},
{path:'category-list',component : CategoryListComponent},
{path:'artist-place',component:ArtistPlaceComponent}
];