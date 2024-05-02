import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { PROFILService } from '../services/profil.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,NgIf,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  //Declarations
  username: string | undefined;
  loggedin : Observable<boolean> | undefined;
  profileData: any;
  //constructor
  constructor(private loginservice:AuthentificationService,private router:Router,private ProfileS: PROFILService){}

  //--------------
  ngOnInit(): void {
    this.loggedin=this.loginservice.loggedIn;

    if (this.loggedin){
      this.username=this.loginservice.username;
    }

    this.ProfileS.profiledata().subscribe(result => {
      this.profileData = result.data;
      console.log(this.profileData);
    });
  }

  isUserMenuOpen: boolean = false;

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(){
    this.loginservice.logout();
    this.router.navigate(['/']);
  }

  pdp(){

  }

}

