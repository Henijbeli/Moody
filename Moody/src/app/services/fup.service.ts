import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FUPService {


  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  username_ch(username: string): Observable<any> {
    const tk = localStorage.getItem('token');

    /*if (tk) {
      const token: any = jwt.decode(tk);
      token.data.username = username;
      const updatedTokenString = jwt.sign(token, ''); // Use jwt.sign to encode the token
      localStorage.setItem('token', updatedTokenString);
    }*/
    return of(null);
  }
  code(user: { code: String, email: String }): Observable<any> {
    return this.http.post<any>("http://localhost/Moody/php/forget_password.php", user).pipe(
      tap(response => {
        if (response.result === "success" && response.jwt) {
          localStorage.setItem('token', response.jwt);
        }
      })
    );
  }


  check_code(): Observable<any> {
    return of(localStorage.getItem('token'));
  }

  rpwd() {
    localStorage.removeItem('token');
  }
}
