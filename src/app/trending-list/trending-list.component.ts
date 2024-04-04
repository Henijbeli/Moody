import { NgClass, NgFor, NgIf } from '@angular/common';
import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { log } from 'console';
import { AnyTxtRecord } from 'dns';
import { stat } from 'fs';

@Component({
  selector: 'app-trending-list',
  standalone: true,
  imports: [NgFor,NgClass,NgIf,RouterLink,FormsModule],
  templateUrl: './trending-list.component.html',
  styleUrl: './trending-list.component.css',

})
export class TrendingListComponent {

  //songs list 
  songList1=[
    {
      img:'../../assets/img/image1.JPG',
      title:'Musique 1',
      artist:'Eminem',
      Path:'../../assets/music/force.mp3'
    },
    {
      img:'../../assets/img/image1.JPG',
      title:'Musique 2',
      artist:'the weekend',
      Path:'../../assets/music/hope.mp3'
    },
    {
      img:'../../assets/img/image2.jpg',
      title:'Musique 3',
      artist:'Billie Elish',
      Path:'../../assets/music/Janji.mp3'
    },
    {
      img:'../../assets/img/image3.JPG',
      title:'Musique 4',
      artist:'Danny Wilson & Gary',
      Path:'../../assets/music/Cartoon.mp3'
    },
    {
      img:'../../assets/img/image4.JPG',
      title:'Musique 5',
      artist:'Danny Wilson & Gary',
      Path:'../../assets/music/Cartoon.mp3'
    },
    {
      img:'../../assets/img/image5.JPG',
      title:'Musique 6',
      artist:'Danny Wilson & Gary',
      Path:'../../assets/music/Cartoon.mp3'
    },
    {
      img:'../../assets/img/image5.JPG',
      title:'Musique 7',
      artist:'Danny Wilson & Gary',
      Path:'../../assets/music/Cartoon.mp3'
    },
    {
      img:'../../assets/img/image4.JPG',
      title:'Musique 8',
      artist:'Danny Wilson & Gary',
      Path:'../../assets/music/Cartoon.mp3',
    },
    {
      img:'../../assets/img/image3.JPG',
      title:'Musique 9',
      artist:'Danny Wilson & Gary',
      Path:'../../assets/music/Cartoon.mp3'
    },
    {
      img:'../../assets/img/image2.jpg',
      title:'Musique 10',
      artist:'Danny Wilson & Gary',
      Path:'../../assets/music/Cartoon.mp3'
    },
    {
      img:'../../assets/img/image1.JPG',
      title:'Musique 11 ',
      artist:'Danny Wilson & Gary',
      Path:'../../assets/music/Cartoon.mp3'
    },
    {
      img:'../../assets/img/image1.JPG',
      title:'Musique 12 ',
      artist:'Danny Wilson & Gary',
      Path:'../../assets/music/Cartoon.mp3'
    },
  ]
  
  explore="Explore more";
  showDiv=true;
  showHeartIcon=true;
  musicName="";
  artistName="";
  song = new Audio();
  currentSongIndex: number = -1;
  AllSongs=document.getElementsByClassName("card");
  volume: number = 50;

trendingList(){
    this.showDiv=!this.showDiv;
    if(this.explore =="Explore more" ){
      this.explore="Explore less";
    }else if(this.explore="Explore less"){
      this.explore="Explore more"
    }
}

playSong(index: number) {
    var state="";
    if(this.song.src == "" ){
      this.currentSongIndex = index;
      this.song.src = (this.songList1[this.currentSongIndex].Path);
      this.song.play();
      this.changeIcon()
      state="pause";
    }
    else{
      this.currentSongIndex = index;
      var newsong= new Audio(this.songList1[this.currentSongIndex].Path);
      if(this.song.src == newsong.src){
        if(this.song.paused){
          this.song.play();
          this.changeIcon();
          state="pause";
        }
        else {
          this.song.pause();
          this.changeIcon();
          state="play";
        }
      }else{
        if(this.song.paused) this.changeIcon()
        this.song.pause();
        this.song.src=newsong.src;
        this.song.play();
        state="pause";
      }
    
  }
  this.musicName=this.songList1[this.currentSongIndex].title;
  this.artistName=this.songList1[this.currentSongIndex].artist;
  this.showHeartIcon=false;
  console.log(state);
  
  var iconElement = Array.from(this.AllSongs)[index].children[2].children[0];
  if (iconElement) {
    iconElement.className = "fa-solid fa-"+state;
  }
}

updateSong(action: any){
  if(this.song.paused) this.changeIcon();
  this.song.pause();
  this.song.currentTime =0;
  if(action === 'next'){
    this.currentSongIndex++;
    if(this.currentSongIndex > this.songList1.length -1) this.currentSongIndex = 0;
  }
  if(action === 'prev'){
    this.currentSongIndex--;
    if(this.currentSongIndex < 0) this.currentSongIndex = this.songList1.length - 1;
  }

  this.song.src = (this.songList1[this.currentSongIndex].Path);
  this.song.play();

}

changeIcon() {
    var iconElement = document.getElementById('play-pause-icon');
    if (iconElement) {
      if(iconElement.className == "ph-bold ph-play")
        iconElement.className = "ph-bold ph-pause";
      else iconElement.className = "ph-bold ph-play";
    }
}

barPlayPause(){
 if(this.song.src !=""){
  if(this.song.paused) this.song.play();
  else this.song.pause();
  this.changeIcon();
 }else{
  this.song = new Audio(this.songList1[0].Path);
  this.song.play();
  this.changeIcon();
 }
}

MouseHover(index:number){
if(!this.song.paused){
  if(index==this.currentSongIndex) {
    var iconElement = Array.from(this.AllSongs)[index].children[2].children[0];
    if (iconElement) {
      iconElement.className = "fa-solid fa-pause";
    }
  }
}
}

MouseLeave(index:number){
  var iconElement = Array.from(this.AllSongs)[index].children[2].children[0];
  if (iconElement) {
    iconElement.className = "fa-solid fa-play";
  }
}

changeVolume() {
  const volumeValue = this.volume / 100;
  console.log(this.song.volume);
  this.song.volume = volumeValue;
}



muteMusic() {
  var muteIcon = document.getElementById('soundIcon');
  if (muteIcon) {
    if (muteIcon.className == "fa-solid fa-volume-high") {
      muteIcon.className = "fa-solid fa-volume-xmark";
      this.song.muted = true;
    } else {
      muteIcon.className = "fa-solid fa-volume-high";
      this.song.muted = false;
    }
  }
}


}



