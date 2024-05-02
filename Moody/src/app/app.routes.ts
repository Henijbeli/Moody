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
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPwdpwdComponent } from './forgot-pwdpwd/forgot-pwdpwd.component';
import { ForgotPwdcodeComponent } from './forgot-pwdcode/forgot-pwdcode.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { AvisComponent } from './avis/avis.component';
import { ContactComponent } from './contact/contact.component';
import { LikedSongsComponent } from './liked-songs/liked-songs.component';
import { AdminArtistComponent } from './admin-artist/admin-artist.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
{path:'updateprofile/:username' , component:UpdateProfileComponent,title:"Profile"},
{path:'forgot-pwd',component:ForgotPwdComponent},
{path:'forgot-pwdcode',component:ForgotPwdcodeComponent},
{path:'forgot-pwdpwd',component:ForgotPwdpwdComponent},
{path:'profile',component:ProfileComponent},
{path:'avis',component:AvisComponent},
{path:'contact',component:ContactComponent},
{path:'likedsongs',component:LikedSongsComponent},
{path:'adminArtist',component:AdminArtistComponent},
{path:'dashboard',component:DashboardComponent}
];