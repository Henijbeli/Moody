import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminArtistService {
  delete(id: any) {
    throw new Error('Method not implemented.');
  }
  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  list(): Observable<any> {
    const tk = localStorage.getItem('token');
    if (tk) {
      const token = this.jwtHelper.decodeToken(tk);
      const username = token.data?.username;
      if (username) {
        const data = { username: username };
        return this.http.post<any>("http://localhost/Moody/php/adminArtist.php", data).pipe(
          catchError(error => {
            console.error('Error in admin artist service:', error);
            throw error;
          })
        );
      }
    }
    throw new Error('No token found or decoding failed');
  }
}
