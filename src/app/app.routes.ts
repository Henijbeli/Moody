import { Routes } from '@angular/router';
import { MoodListComponent } from './mood-list/mood-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ArtistPlaceComponent } from './artist-place/artist-place.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ThempoListComponent } from './tempo-list/tempo-list.component';
import { GeneratedSongsComponent } from './generated-songs/generated-songs.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';

export const routes: Routes = [  
{path:'',component: MoodListComponent },
{path:'mood-list', component: MoodListComponent},
{path:'category-list',component : CategoryListComponent},
{path:'artist-place',component:ArtistPlaceComponent},
{path:'activity-list',component:ActivityListComponent},
{path:'tempo-list',component:ThempoListComponent},
{path:'generated-songs',component:GeneratedSongsComponent},
{path:'upload-form',component:UploadFormComponent},
{path:'login',component:LoginComponent},
{path:'signup',component:SingupComponent},
];