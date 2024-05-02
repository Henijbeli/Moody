import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class PROFILService {
  jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  profiledata(): Observable<any> {
    const tk = localStorage.getItem('token');
    if (tk) {
      const token = this.jwtHelper.decodeToken(tk);
      const username = token.data.username;
      const data = {
        "username": username
      };
      return this.http.post<any>("http://localhost/Moody/php/profile.php", data).pipe(
        tap(response => {
          if (response.result == "success") {
            return response.data;
           
          } else {
            return "failure";
          }
        })
      );
    }
    
    
    return of(null);
  }
  follow(): Observable<any> {
    const tk = localStorage.getItem('token');

    if (tk) {
      const token = this.jwtHelper.decodeToken(tk);
      const username = token.data.username;
      const data = {
        "username": username
      };
      return this.http.post<any>("http://localhost/Moody/php/GetfollowersArtist.php", data).pipe(
        tap(response => {
          if (response.result == "success") {
            return response.data;
           
          } else {
            return "failure";
          }
        })
      );
    }
    return of(null);
  }
}
