import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadSongService {

  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  getNickname(): Observable<any> {
    const tk = localStorage.getItem('token');

    if (tk) {
      const token = this.jwtHelper.decodeToken(tk);
      const username = token.data.username;
      var data = {
        "user": username
      }
      if (username) {
        return this.http.post<any>("http://localhost/Moody/php/nickname.php", data).pipe(
          map(response => {
            if (response.result === "success") {
              return response.nickname;
            } else {
              throw new Error('Failed to retrieve nickname');
            }
          })
        );
      }
    }

    return of(null);
  }
  uploadSong(formData: FormData, forms: any): Observable<any> {
    // Start the upload process by posting the formData
    return this.http.post<any>('http://localhost/Moody/php/uploadSong.php', formData).pipe(
      switchMap(response => {
        console.log(response);
        if (response.result === "success") {
          forms.url = response.url;
          forms.cover = response.cover;
          console.log(forms);

          // Now post the forms to the server
          return this.http.post<any>('http://localhost/Moody/php/UploadSongsForms.php', forms).pipe(tap(response => {
            console.log(response);
          }));
        } else {
          return throwError(() => new Error('Failed to process the song upload: ' + response.message));
        }
      })
    );
  }

  update_profile_pic(formData:FormData): Observable<any>{
    return this.http.post<any>('http://localhost/Moody/php/UpdateProfilePic.php', formData)
      .pipe(
        tap(response => console.log(response)), // Logging the response
        catchError(error => {
          console.error('Error updating profile picture:', error);
          throw error; // Rethrowing the error to be handled by the component
        })
      );

  }
}