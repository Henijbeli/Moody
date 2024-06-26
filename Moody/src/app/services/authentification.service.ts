import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  token : any
  username: string |undefined;
  
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if the code is running in the browser environment before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
      if (this.token) {
        this.loggedIn.next(true);
        const decoded = jwtDecode(this.token);
        this.username  = (decoded as { data: { username: string } }).data.username;
      }
    }
  }

  login(user: { Username: string, Password: string }): Observable<any> {
    return this.http.post<any>("http://localhost/Moody/php//login.php",user).pipe(
      tap(response => {
        if (response.result && response.jwt) {
          localStorage.setItem('token', response.jwt);
          this.loggedIn.next(true);
        }
      })
    );
  }
  

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}

