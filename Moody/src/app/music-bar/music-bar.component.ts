import { Component, OnDestroy, OnInit } from '@angular/core';
import { Song } from '../model/song';
import { MusicPlayerServiceService } from '../services/music-player-service.service';
import { Subject, takeUntil } from 'rxjs';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-music-bar',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, RouterLink],
  templateUrl: './music-bar.component.html',
  styleUrl: './music-bar.component.css'
})
export class MusicBarComponent implements OnInit, OnDestroy {
  currentSong: Song = new Song();
  $destroy: Subject<void> = new Subject();
  volume: number = 0.5;
  audio: any = undefined;
  isFollowing: boolean = false;
  ar: any;
  showHeartIcon = true;
  hideHeartIcon = true;

  constructor(private musicPlayerService: MusicPlayerServiceService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.ar = this.currentSong.artist;
    this.musicPlayerService.getSong()
      .pipe(
        takeUntil(this.$destroy)
      )
      .subscribe((song) => {
        if (song.path == "") return;
        if (!this.audio) this.audio = new Audio(this.currentSong.path);
        if (this.currentSong.id == song.id) {
          if (this.audio.paused) this.audio.play();
          else this.audio.pause();
          this.musicPlayerService.setIsPaused(this.audio.paused)
          return;
        }
        this.currentSong = song;
        this.audio.src = this.currentSong.path;
        this.audio.play();
        this.musicPlayerService.setIsPaused(this.audio.paused);
        this.checkFollowStatus();
        this.checkLikeStatus();
      })

    this.musicPlayerService.getIsPaused()
      .pipe(
        takeUntil(this.$destroy)
      )
      .subscribe((value) => {
        this.changeIcon()
      })
  }

  checkFollowStatus(): void {
    var username = this.musicPlayerService.getUsername();
    var artist = this.currentSong.artist;
    this.http.post<{ isFollowing: boolean }>('http://localhost/Moody/php/checkF.php', {
      username: username,
      nickname: artist
    }).subscribe({
      next: (response) => {
        console.log('Follow status:', response.isFollowing);
        this.isFollowing = response.isFollowing;
      },
      error: (error) => {
        console.error('Failed to check follow status', error);
        this.isFollowing = false; // Assume not following if there's an error
      }
    });
  }

  FollowC(): void {
    var action = this.isFollowing ? 'unfollow' : 'follow';
    var username = this.musicPlayerService.getUsername();
    var artist = this.currentSong.artist;
    const data = {
      nickname: artist,
      action: action,
      username: username
    };
    this.http.post('http://localhost/Moody/php/Follow.php', data)
      .subscribe({
        next: (response) => {
          console.log(`${action} successful`, response);
          this.isFollowing = !this.isFollowing; // Toggle follow state based on response
        },
        error: (error) => {
          console.error(`Error during ${action}`, error);
        }
      });
  }

  downloadSong() {
    var songUrl = this.currentSong.path;
    var fileName = this.currentSong.title;
    var anchor = document.createElement('a');
    anchor.href = songUrl;
    anchor.download = fileName;
    anchor.click();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
  checkLikeStatus(): void {
    const username = this.musicPlayerService.getUsername();
    const artist = this.currentSong.artist;
    const title = this.currentSong.title;  
    const data = {
      username: username,
      artist: artist,
      name: title
    };
    this.http.post<{ isLiked: boolean }>('http://localhost/Moody/php/CheckLikeStatus.php', data).subscribe({
      next: (response) => {
        this.showHeartIcon = response.isLiked;
      }
    });
  }
  likedSong() {
    this.showHeartIcon = !this.showHeartIcon;
    const action = this.showHeartIcon ? "remove" : "add";
    const username = this.musicPlayerService.getUsername();
    const artist = this.currentSong.artist;
    const title = this.currentSong.title;
    const data = {
      username: username,
      action: action,
      artist: artist,
      name: title
    };
    console.log(data);
    this.http.post('http://localhost/Moody/php/Like.php', data).subscribe({
      next: (response: any) => {
        console.log('Response from like/unlike operation:', response);
      },
      error: (error) => {
        console.error('Error during like/unlike operation:', error);
      }
    });
  }



  barPlayPause() {
    if (this.audio.paused) this.audio.play();
    else this.audio.pause()
    this.musicPlayerService.setIsPaused(this.audio.paused)
  }

  //skip or return 
  updateSong(action: any) {
    if ("prev" == action) this.musicPlayerService.previous.next()
    else this.musicPlayerService.next.next();
  }

  //mute music and change the sound icon
  muteMusic() {
    var muteIcon = document.getElementById('soundIcon');
    if (muteIcon) {
      if (muteIcon.className == "fa-solid fa-volume-high") {
        muteIcon.className = "fa-solid fa-volume-xmark";
        this.audio.muted = true;
      } else {
        muteIcon.className = "fa-solid fa-volume-high";
        this.audio.muted = false;
      }
    }
  }

  //change music volume with range bar 
  changeVolume(event: any) {
    this.audio.volume = event.target.value;
  }

  //play the song when click on any song 
  playSong(index: number) {

  }

  //chnage icon (play/pause) of the music player bar
  changeIcon() {
    var iconElement = document.getElementById('play-pause-icon');
    if (iconElement)
      iconElement.className = this.audio.paused ? "ph-bold ph-play" : "ph-bold ph-pause"

  }



}
