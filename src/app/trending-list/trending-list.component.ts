import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnyTxtRecord } from 'dns';

@Component({
  selector: 'app-trending-list',
  standalone: true,
  imports: [NgFor,NgClass,NgIf,RouterLink],
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
  trendingList(){
    this.showDiv=!this.showDiv;
    if(this.explore =="Explore more" ){
      this.explore="Explore less";
    }else if(this.explore="Explore less"){
      this.explore="Explore more"
    }
  }
  showHeartIcon=true;
  musicName="";
  artistName="";
  song = new Audio();
  currentSongIndex: number = -1;
  playSong(index: number) {
    if(this.song.src == "" ){
      this.currentSongIndex = index;
      this.song.src = (this.songList1[this.currentSongIndex].Path);
      this.song.play();
    }
    else{
      this.currentSongIndex = index;
      var newsong= new Audio(this.songList1[this.currentSongIndex].Path);
      if(this.song.src == newsong.src){
        if(this.song.paused){
          this.song.play();
        }
        else {
          this.song.pause();
        }
      }else{
        this.song.pause();
        this.song.src=newsong.src;
        this.song.play();
      }
  }
  this.musicName=this.songList1[this.currentSongIndex].title;
  this.artistName=this.songList1[this.currentSongIndex].artist;
  this.showHeartIcon=false;

}

play=document.getElementById("#play");

updateSong(action: any){
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




}