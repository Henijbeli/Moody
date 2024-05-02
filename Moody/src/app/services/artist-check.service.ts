import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ArtistCheckService {
  private jwtHelper: JwtHelperService;
  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
   }

  check(): Observable<boolean> {
    const tk = localStorage.getItem('token');

    // You need to return Observable, even if token is null
    if (!tk) {
      return of(false);
    }

    const token = this.jwtHelper.decodeToken(tk);
    const username = token.data.username;

    if (!username) {
      return of(false);
    }

    var data = {
      "user": username
    };

    return this.http.post<any>('http://localhost/Moody/php/CheckArtiste.php', data).pipe(
      map(response => {
        if (response.result === "success") {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  delete(id_song: any): Observable<boolean> {
    const data = { id: id_song };

    return this.http.post<any>('http://localhost/Moody/php/DeleteSong.php', data).pipe(
      map(response => {
        return response.result === true;
      })
    );
  }
  
  

  add(NickName: String): Observable<boolean> {
    const tk = localStorage.getItem('token');

    if (!tk) {
      return of(false);
    }

    const token = this.jwtHelper.decodeToken(tk);
    const username = token.data.username;

    if (!username) {
      return of(false);
    }

    var data = {
      "username": username,
      "nickname" : NickName
    };

    return this.http.post<any>('http://localhost/Moody/php/AddArtiste.php', data).pipe(
      map(response => {
        if (response.result === "success") {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
