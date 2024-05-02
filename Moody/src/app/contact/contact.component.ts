import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  ContactF: FormGroup = new FormGroup({});
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.ContactF = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      subject: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9 ?.-_]*')]),
      message: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9 ?.-_]*')]),
    });

  }
  SendM() {
    if (this.ContactF.valid) {
      this.http.post("http://localhost/Moody/php/contact.php", this.ContactF.value).subscribe((res: any) => {
        if (res.result === "success") {
          Swal.fire({
            title: "Good job!",
            text: "Thank you for your Message",
            icon: "success"
          });
          this.router.navigate(['/']);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      })
    }
  }
}