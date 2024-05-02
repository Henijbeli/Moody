import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UploadSongService } from '../services/upload-song.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  UploadForm: FormGroup = new FormGroup({});
  selectedAudioFile: File | null = null;
  selectedImageFile: File | null = null;

  constructor(private serviceUpload: UploadSongService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.UploadForm = new FormGroup({
    songname: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9@. ]*')]),
      ArtistName: new FormControl(''),
      mood: new FormControl(null),
      category: new FormControl(null),
      activity: new FormControl(null),
      tempo: new FormControl(null),
      cover: new FormControl(''),
      url: new FormControl('')
    });
    this.serviceUpload.getNickname().subscribe({
      next: (nickname) => {
        this.UploadForm.get('ArtistName')?.setValue(nickname);
      },
      error: (error) => {
        console.error('Error fetching nickname:', error);
      }
    });


  }

  onFileSelected(event: Event, type: string): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      if (type === 'audio') {
        this.selectedAudioFile = fileList[0];
        //console.log('Audio file selected:', this.selectedAudioFile.name);
      } else if (type === 'image') {
        this.selectedImageFile = fileList[0];
        //console.log('Image file selected:', this.selectedImageFile.name);
      }
    } else {
      console.log(type + ' file not selected');
    }
  }

  Datafiles(): FormData | void {
    if (this.UploadForm.valid) {
      var formData: any = new FormData();
      formData.append('songname', this.UploadForm.value.songname);

      if (this.selectedAudioFile) {
        formData.append('audioFile', this.selectedAudioFile, this.selectedAudioFile.name);
      } else {
        console.error('No audio file is selected');
        return;
      }

      if (this.selectedImageFile) {
        formData.append('imageFile', this.selectedImageFile, this.selectedImageFile.name);
      } else {
        console.error('No image file is selected');
        return;
      }
      return formData;
    } else {
      console.error('Form is invalid:', this.UploadForm.errors);
    }
  }
  //upload function to send data to the BD
  Upload(): void {

    var forms = this.UploadForm.value;
    const formData = this.Datafiles();

    if (formData) {
      this.serviceUpload.uploadSong(formData, forms).subscribe({
        next: (response) => {
          if (response) {
            Swal.fire({
              title: "Congratulations",
              text: "Your song has been added",
              icon: "success"
            });
            this.router.navigate(['/adminArtist']);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
            });
          }
        },
        error: (err) => {
          console.error("Error during parsing:", err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred: " + err.message,
          });
        }
      });      

    } else {
      console.error("Form data creation failed or form is not valid.");
    }
  }

}
