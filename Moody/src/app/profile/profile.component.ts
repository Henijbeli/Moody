import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import path from 'path';
import { PROFILService } from '../services/profil.service';
import { log } from 'console';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  followedArtists:any[]=[];

  profileData: any;
  constructor(private ProfileS: PROFILService){}
  ngOnInit(): void {
    this.ProfileS.profiledata().subscribe(result => {
      this.profileData = result.data;
      console.log(this.profileData);
    });

    this.fetchFollow();
    
  }
  fetchFollow(): void {
    this.ProfileS.follow().subscribe({
      next: (res) => {
        this.followedArtists = res;
        console.log('Updated song list:', this.followedArtists);
      },
      error: (error: any) => console.error('Error retrieving the songs:', error)
    });
  }

}
