import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Song } from '../model/song';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GeneratedsongsService {

  public songType: any[] = [
    {
      "mood": "",
      "category": "",
      "activity": "",
      "tempo": ""
    }
  ];

  collectingSongType(type: string, choice: string) {
    if (type in this.songType[0]) { // Check if the specified type exists in the object
      this.songType[0][type] = choice; // Use bracket notation to access the property dynamically
    } else {
      console.error("Invalid song type specified.");
    }
  }
  jwtHelper: JwtHelperService;
  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  generate(data: any): Observable<any> {
    return this.http.post<any>("http://localhost/Moody/php/Generate.php", data)
      .pipe(
        map(response => {
          return response; // transform the response if needed
        }),
        catchError(error => {
          console.error('Error in HTTP request', error);
          return throwError(() => new Error('Error in HTTP request'));
        })
      );
  }

  trending(): Observable<any> {
    return this.http.get<any>("http://localhost/Moody/php/Trending.php")
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Error in HTTP request', error);
          return throwError(() => new Error('Error in HTTP request'));
        })
      );
  }

  liked(): Observable<any> {
    const tk = localStorage.getItem('token');

    if (!tk) {
      console.error('Token not found in local storage');
      return throwError(() => new Error('Authentication token not found'));
    }

    const token = this.jwtHelper.decodeToken(tk);
    const username = token.data.username;
    const data = { 
      "username": username 
    };

    return this.http.post<any>("http://localhost/Moody/php/LikedPage.php", data)
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Error in HTTP request', error);
          return throwError(() => new Error('Error in HTTP request'));
        })
      );
  }

}
