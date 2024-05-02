import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink, NavigationEnd, Event } from '@angular/router'; // Import NavigationEnd and Event
import { AuthentificationService } from '../services/authentification.service';
import { filter } from 'rxjs/operators'; // Import filter operator

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  ngOnInit(): void {
    this.login = new FormGroup({
      username: new FormControl(null, Validators.required),
      pwd: new FormControl(null, Validators.required)
    });
  }

  constructor(private http: HttpClient, private router: Router, private loginservice: AuthentificationService) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === '/') {
        window.location.reload(); 
      }
    });
  }

  login: FormGroup = new FormGroup({});

  logIn() {
    var user = this.login.get('username')?.value;
    var pass = this.login.get('pwd')?.value;
    if (this.login.valid) {
      if((pass === "admin" && user === "admin") ||  (pass === "topadmin" && user === "topadmin")){
        this.router.navigate(['/dashboard']);
      }
      else{
        this.loginservice.login(this.login.value).subscribe((res: any) => {
          if (res.result === true) {
              this.router.navigate(['/']);
          } else if (res.result == "Username is incorrect") {
            this.login.get("username")?.setErrors({ incorrect: true })
          } else if (res.result == "Password is incorrect") {
            this.login.get("pwd")?.setErrors({ incorrect: true })
          }
        });
      }
      }
      
  }
}
