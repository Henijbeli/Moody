import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avis',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent {
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars: boolean[] = Array(5).fill(false);
  avis: FormGroup = new FormGroup({});
  loggedin: any;
  username: string | undefined;
  constructor(private update_autho: AuthentificationService,private http: HttpClient){}

  ngOnInit(): void {
    this.avis_list();
    this.loggedin = this.update_autho.loggedIn;
    if (this.loggedin) {
      this.username = this.update_autho.username;
    }
    var username = this.username;


    this.avis = new FormGroup({
      username: new FormControl(username),
      rate: new FormControl(this.rating),
      message: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]*')])
    });
  }
  
  rate(i: number) {
    this.rating = i + 1;
    this.ratingChange.emit(this.rating);
  }

  Add_Avis(){
    if(this.rating==0){
      this.rating=1
    }
    this.avis.patchValue({
      rate: this.rating              
    });

    this.http.post("http://localhost/Moody/php/Add_Avis.php", this.avis.value).subscribe((res: any) => {
      if (res.result) {
        Swal.fire({
          title: "Thnx for ur Time",
          text: "ur Avis Added",
          icon: "success"
        });
      }
    });
  }

  displayStars(rating: number) {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  Avis:any[]=[];
  avis_list(){
    this.http.get("http://localhost/Moody/php/List_Avis.php").subscribe((res: any) => {
      this.Avis = res;
    });
  }
}
