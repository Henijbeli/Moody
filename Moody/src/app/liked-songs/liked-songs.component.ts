import { NgFor, NgIf } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { GeneratedsongsService } from '../services/generatedsongs.service';
import { Song } from '../model/song';
import { MusicPlayerServiceService } from '../services/music-player-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liked-songs',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './liked-songs.component.html',
  styleUrl: './liked-songs.component.css'
})
export class LikedSongsComponent {
  TestList:any[]=[];
  songList1: any[] = [];
  constructor(private GS:GeneratedsongsService,private musicPlayerService: MusicPlayerServiceService,private authService: AuthentificationService,private renderer: Renderer2,private router: Router){
    this.songList1.forEach((song, index) => song.id = index.toString())
  }
  ngOnInit(): void {
    this.fetchSongs();
    this.musicPlayerService.getSong()
    .pipe(
      takeUntil(this.$destroy)
    )
    .subscribe((song) => {
      this.currentSong = song;
      this.MouseHover(song);
    })

  this.musicPlayerService.getIsPaused().subscribe(value => this.isPuased = value)
  this.musicPlayerService.previous.subscribe(() => {
    let currentSongIndex = this.songList1.findIndex((song) => song.id == this.currentSong.id);
    currentSongIndex--
    if (currentSongIndex < 0) currentSongIndex = this.songList1.length - 1;
    this.playSong(this.songList1[currentSongIndex])
  })

  this.musicPlayerService.next.subscribe(() => {
    let currentSongIndex = this.songList1.findIndex((song) => song.id == this.currentSong.id);
    currentSongIndex++
    if (currentSongIndex > this.songList1.length - 1) currentSongIndex = 0;
    this.playSong(this.songList1[currentSongIndex])
  })
  }

  fetchSongs(): void {
    var id=-1;
    this.GS.liked().subscribe({
      next: (data: Song[]) => {
        this.TestList = data.map(song => {
          // Create a new object with updated properties
          const updatedSong = {
            ...song,
            Path: song.url,  // Ensure that the path property is correctly set
            artist: song.nickname,
            title: song.name,
            img: song.cover,
            id:id++
          };
  
          return updatedSong;
        });
        this.songList1 = JSON.parse(JSON.stringify(this.TestList));
      },
      error: (error: any) => console.error('Error retrieving the songs:', error)
    });
    
  }

  AllSongs = document.getElementsByClassName("card");
  song = new Audio();
  currentSongIndex: number = -1;

  //initialisation of music volume
  volume: number = 50;
  $destroy: Subject<void> = new Subject();
  currentSong: Song = new Song();
  isPuased: boolean = false;


  ngOnDestroy(): void {
  }
  


  //if there is a played song keep the play button for all  the other songs
  MouseHover(song: any) {
    if (song.id == this.currentSong.id) {
      const iconElement = document.getElementById(song.id)?.children[0];
      if (iconElement) {
        iconElement.className = this.isPuased ? "fa-solid fa-play": "fa-solid fa-pause";
      }
    }
  }

  //if there is a played song keep the pause button for all  the other songs
  MouseLeave(index: number) {
    var iconElement = Array.from(this.AllSongs)[index].children[2].children[0];
    if (iconElement) {
      iconElement.className = "fa-solid fa-play";
    }
  }


  playSong(song: any): void {
    const currentSong = new Song();
    currentSong.id = song.id;
    currentSong.title = song.title;
    currentSong.path = song.Path;
    currentSong.artist = song.artist;
    currentSong.img = song.img;
    this.musicPlayerService.setSong(currentSong)
  }

  navigateWithAuthGuard(song: any): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.playSong(song);
      } 
      else {
        Swal.fire({
          title: 'Please Log In to Continue',
          text: "Confirm if you'd like to listen to songs",
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Log In',
          cancelButtonText: 'No, cancel !',
          reverseButtons: true,
          customClass: 'btn-yellow btn-blue white-text' 
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']).then(() => {
            });
          } else {
            Swal.fire('Cancelled', 'You have cancelled the action', 'error');
          }
        });


        //custom
        const popup = document.querySelector('.swal2-popup');
        if (popup) {
          this.renderer.setStyle(popup, 'background-color', 'white');
        }

        const confirmButton = document.querySelector('.swal2-confirm');
        if (confirmButton) {
          confirmButton.setAttribute('style', 'color: black !important; background-color: #FFD700 !important; border: none !important; text-decoration: none !important; border-radius: 50px !important;');
        }


        const cancelButton = document.querySelector('.swal2-cancel');
        if (cancelButton) {
          cancelButton.setAttribute('style', 'color: white !important; background-color: black !important; border: none !important; border-radius: 50px !important; text-decoration: none !important');
        }

        const text = document.querySelector('.swal2-popup .swal2-content');
        if (text) {
          text.setAttribute('style', 'color: black !important;');
        }

      }
    });
  }


}


  