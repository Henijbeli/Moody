import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthentificationService } from '../services/authentification.service';
import { profile } from 'console';
import { switchMap } from 'rxjs';
import { UploadSongService } from '../services/upload-song.service';



@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit, AfterViewInit {
  selectedImageFile: File | null = null;


  constructor(private http: HttpClient, private router: Router, private update_autho: AuthentificationService,private serviceUpload: UploadSongService) { }



  @ViewChild('fileInput') inputFile!: ElementRef;
  @ViewChild('profileImage') profileImage!: ElementRef;
  ngAfterViewInit(): void {

  }

  onFileSelected(event: Event): void {
    // Ensure the event's target is an HTMLInputElement
    const inputElement = event.target as HTMLInputElement;
    
    // Check if files are available in the input element
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      
      // Assume 'type' needs to be defined or is accessible in this context; for clarity, we'll assume image files only
      if (file.type.startsWith('image/')) {
        this.selectedImageFile = file; // Store the file reference
        console.log('Image file selected:', this.selectedImageFile.name);
        
        // Use FileReader to read the file for display
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target && this.profileImage && this.profileImage.nativeElement) {
            this.profileImage.nativeElement.src = event.target.result as string;
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.log('Non-image file selected');
      }
    } else {
      console.log('No file selected');
    }
  }
  



  loggedin: any;
  username: string | undefined;


  //initialisation of user object
  profile: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.loggedin = this.update_autho.loggedIn;
    if (this.loggedin) {
      this.username = this.update_autho.username;
    }
    const old_username = this.username;

    this.profile = new FormGroup({
      username: new FormControl('', Validators.pattern('[a-zA-Z0-9]*')),
      name: new FormControl('', Validators.pattern('[a-zA-Z]*')),
      lastname: new FormControl('', Validators.pattern('[a-zA-Z]*')),
      email: new FormControl('', Validators.email),
      pwd: new FormControl('', [Validators.minLength(6), Validators.pattern('[a-zA-Z0-9.]*')]),
      npwd: new FormControl('', [Validators.minLength(6), Validators.pattern('[a-zA-Z0-9.]*')]),
      pdp: new FormControl(''),
      user: new FormControl(old_username)
    });
  }


  update_pic(formData:FormData): void{
    this.serviceUpload.update_profile_pic(formData).subscribe({
      next: (response) => {
        console.log('Profile picture updated successfully', response);
      }
    });
  }

  //post fucntion
  update() {
    var formData: any = new FormData();
    formData.append('username', this.profile.value.user);
    if (this.selectedImageFile) {
      formData.append('imgprofile', this.selectedImageFile, this.selectedImageFile.name);
      this.update_pic(formData);
    } else {
      console.error('No image file is selected');
      return;
    }
    //UpdateProfilePic.php
    if (this.profile.get('username')?.value) {
      this.http.post("http://localhost/Moody/php/update.php", this.profile.value).subscribe((res: any) => {
        console.log(res);
        if (res.result) {
          Swal.fire({
            title: "Good job!",
            text: "Thank you for joining us",
            icon: "success"
          });
          this.update_autho.logout();
          this.router.navigate(['/login']);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      });
    } else {
      console.log(this.profile.value);
      this.http.post("http://localhost/Moody/php/update.php", this.profile.value).subscribe((res: any) => {
        console.log(res);
        if (res.result) {
          Swal.fire({
            title: "Good job!",
            text: "Thank you for joining us",
            icon: "success"
          });
          this.router.navigate(['/profile']);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
        if (res.username_error == "username incorrect") {
          this.profile.get("username")?.setErrors({ incorrect: true })
        }
        if (res.email_error == "email incorrect") {
          this.profile.get("email")?.setErrors({ incorrect: true })
        }
      });
    }
  }

}


