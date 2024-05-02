import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { FUPService } from '../services/fup.service';
@Component({
  selector: 'app-forgot-pwdcode',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-pwdcode.component.html',
  styleUrl: './forgot-pwdcode.component.css'
})
export class ForgotPwdcodeComponent implements OnInit {

  ngOnInit(): void {
    this.CodeC = new FormGroup({
      code: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')])
    });
  }
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private Codeservice: FUPService) { }
  CodeC: FormGroup = new FormGroup({});

  CodeF() {

    this.Codeservice.check_code().subscribe((token: any) => {
      if (this.CodeC.valid) {

        const tkn = jwtDecode(token) as { data: { code: string,email:String } };
        const tknc = tkn.data.code;
        const tkne = tkn.data.email;

        const data1 = this.CodeC.value; // Initialize data1

        if (data1.code == tknc) {
          const data ={
            code : data1.code,
            email : tkne
          }
          this.http.post("http://localhost/Moody/php/code.php", data).subscribe((res: any) => {
            if (res.result === "success") {
              Swal.fire({
                title: "Good job!",
                text: "Update ur password now",
                icon: "success"
              });
              console.log("suiiiii");
              this.router.navigate(['/forgot-pwdpwd']);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          }
            ,
            (error) => {
              console.error("Error occurred:", error);
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Uncorrect code!",
          });
        }
      }


    });
  }
}
