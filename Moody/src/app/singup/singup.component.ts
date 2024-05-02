import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormGroup,FormControl,Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgIf],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent implements OnInit{

  ngOnInit(): void {
    this.signup=new FormGroup({
      username:new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]),
      name:new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z]*')]),
      lastname:new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z]*')]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      pwd:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('[a-zA-Z0-9.]*')]),
      gender:new FormControl(null,Validators.required),
    });
  }

  constructor(private http: HttpClient,private router:Router) {}

//initialisation of user object
signup:FormGroup= new FormGroup({});
  
//post fucntion
signUp(){
  //assignement of the form values into the user object
  if(this.signup.valid){
    this.http.post("http://localhost/Moody/php/sign_up.php", this.signup.value).subscribe((res: any) => {
    if(res.result === "success"){
      Swal.fire({
        title: "Good job!",
        text: "Thank you for joining us",
        icon: "success"
      });
      this.router.navigate(['/login']);
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    if(res.username_error =="username incorrect"){
      this.signup.get("username")?.setErrors({incorrect : true})
    }
    if(res.email_error =="email incorrect"){
      this.signup.get("email")?.setErrors({incorrect : true})
    }
    });
  }
  else{
    console.log("error");
  }
}



}
