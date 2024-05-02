import { NgClass, NgFor, NgIf } from '@angular/common';
import { compileNgModule } from '@angular/compiler';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Event as RouterEvent, NavigationEnd, Router, RouterLink } from '@angular/router';
import { AnyTxtRecord } from 'dns';
import { stat } from 'fs';
import { MusicPlayerServiceService } from '../services/music-player-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Song } from '../model/song';
import Swal from 'sweetalert2';
import { AuthentificationService } from '../services/authentification.service';
import { ArtistCheckService } from '../services/artist-check.service';
import { filter } from 'rxjs/operators'; // Import filter operator
import { GeneratedsongsService } from '../services/generatedsongs.service';


@Component({
  selector: 'app-trending-list',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './trending-list.component.html',
  styleUrl: './trending-list.component.css',

})
export class TrendingListComponent implements OnInit, OnDestroy {

  //songs list 
  TestList:any[]=[];
  songList1: any[] = [];

  //explore button
  explore = "Explore more";
  showDiv = false;

  //select and create song
  AllSongs = document.getElementsByClassName("card");
  song = new Audio();
  currentSongIndex: number = -1;

  //initialisation of music volume
  volume: number = 50;
  $destroy: Subject<void> = new Subject();
  currentSong: Song = new Song();
  isPuased: boolean = false;
  shouldShowModal: boolean | undefined;



  constructor(private musicPlayerService: MusicPlayerServiceService, 
              private authService: AuthentificationService, 
              private renderer: Renderer2, 
              private router: Router, 
              private artiste: ArtistCheckService,
              private GS:GeneratedsongsService) {
    this.songList1.forEach((song, index) => song.id = index.toString());
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === '/upload-form') {
        window.location.reload();
      }
    });
  }
  ngOnDestroy(): void {
  }
  ArtisteN: FormGroup = new FormGroup({});
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
    this.ArtisteN = new FormGroup({
      nicknameC: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9@. ]*')])
    });
  }


  fetchSongs(): void {
    var id=-1;
    this.GS.trending().subscribe({
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

  


  //when i click on show more it change to show less wel aakes shih
  showHideExploreMore() {
    this.showDiv = !this.showDiv;
    this.explore = this.explore == "Explore more" ? "Explore less" : "Explore more"
  }

  //play the paused song if there is no song paused play the firt song of the list


  //if there is a played song keep the play button for all  the other songs
  MouseHover(song: any) {
    if (song.id == this.currentSong.id) {
      const iconElement = document.getElementById(song.id)?.children[0];
      if (iconElement) {
        iconElement.className = this.isPuased ? "fa-solid fa-play" : "fa-solid fa-pause";
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
  NickName() {
    if (this.ArtisteN.valid) {
      var Nickname =this.ArtisteN.value.nicknameC;
      this.artiste.add(Nickname).subscribe(result => {
        if(result){
          this.router.navigate(['/upload-form']);
        }
      });
    }
  }
  TestArtiste() {
    this.artiste.check().subscribe(result => {
      if (result) {
        console.log(result)
        this.shouldShowModal = false;
        this.router.navigate(['/upload-form']);
      } else {
        this.shouldShowModal = true;
        this.NickName();
      }
    });
  }

}



