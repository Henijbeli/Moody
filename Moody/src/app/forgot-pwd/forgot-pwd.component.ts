import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FUPService } from '../services/fup.service';


@Component({
  selector: 'app-forgot-pwd',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-pwd.component.html',
  styleUrl: './forgot-pwd.component.css'
})
export class ForgotPwdComponent implements OnInit {
  FUPForm: FormGroup = new FormGroup({});

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private Codeservice:FUPService) { }

  ngOnInit(): void {
    this.FUPForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9@.]*')])
    });
  }

  FUP() {
    if (this.FUPForm.valid) {
      this.Codeservice.code(this.FUPForm.value).subscribe((res: any) => {
        if (res.result === "success") {
          Swal.fire({
            title: "Request sent!",
            text: "Check your email",
            icon: "success"
          });
          this.router.navigate(['/forgot-pwdcode']);
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
        if(res.email_error =="email incorrect"){
          this.FUPForm.get("email")?.setErrors({incorrect : true})
        }
      },
        (error) => {
          console.error("Error occurred:", error);
        }
      );

    }
  }
}