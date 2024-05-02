import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Song } from '../model/song';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerServiceService {
  private song: BehaviorSubject<Song> = new BehaviorSubject(new Song())
  private volume: BehaviorSubject<number> = new BehaviorSubject(50)
  private isPaused: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public next: Subject<void> = new Subject();
  public previous: Subject<void> = new Subject();

  jwtHelper: JwtHelperService;
  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  setSong(song: Song): void {
    this.song.next(song);
  }

  getSong(): BehaviorSubject<Song> {
    return this.song;
  }

  setVolume(volume: number): void {
    this.volume.next(volume)
  }

  getVolume(): BehaviorSubject<number> {
    return this.volume;
  }

  setIsPaused(value: boolean): void {
    this.isPaused.next(value)
  }

  getIsPaused(): BehaviorSubject<boolean> {
    return this.isPaused;
  }

  getUsername() {
    const tk = localStorage.getItem('token');
    if (tk) {
      var token = this.jwtHelper.decodeToken(tk);
      var username = token.data.username;
      return username;
    }
  }
}
