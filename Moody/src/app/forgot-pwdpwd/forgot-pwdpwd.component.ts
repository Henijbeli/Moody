import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthentificationService } from '../services/authentification.service';
import { jwtDecode } from 'jwt-decode';
import { FUPService } from '../services/fup.service';

@Component({
  selector: 'app-forgot-pwdpwd',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-pwdpwd.component.html',
  styleUrl: './forgot-pwdpwd.component.css'
})
export class ForgotPwdpwdComponent implements OnInit {
  pwd: any;
  data: any;
  data2: any;
  ngOnInit(): void {
    this.PWDForm = new FormGroup({
      pwd: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9.]*')]),
      cpwd: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9.]*')])
    });
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private remove_code: FUPService) { }

  PWDForm: FormGroup = new FormGroup({});

  PWD() {
    const pwdControl = this.PWDForm.get('pwd');
    console.log('Password control value:', pwdControl?.value);

    if (this.PWDForm.get('pwd')?.value === this.PWDForm.get('cpwd')?.value) {
      this.remove_code.check_code().subscribe((token: any) => {
        const data1 = this.PWDForm.value;
        const tkn = jwtDecode(token) as { data: { code: string, email: string } };
        const tkne = tkn.data.email;
        const data = {
          pwd: data1.pwd,
          email: tkne
        };

        console.log("cha999", data);

        this.http.post("http://localhost/Moody/php/Reset_ur_pwd.php", data).subscribe((res: any) => {
          console.log(res);
          if (res.result === "success") {
            Swal.fire({
              title: "Good job!",
              text: "ur password updated",
              icon: "success"
            });
            this.remove_code.rpwd();
            this.router.navigate(['/login']);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }),


          (error: HttpErrorResponse) => { // Explicitly declare the type of error parameter
            console.error("Error occurred:", error);
          };
      });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "confirme ur password!",
      });
    }
  }
}
