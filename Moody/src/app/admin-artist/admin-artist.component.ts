import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AdminArtistService } from '../services/admin-artist.service';
import { Song } from '../model/song';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-artist',
  standalone: true,
  imports: [NgFor,CommonModule,FormsModule],
  templateUrl: './admin-artist.component.html',
  styleUrl: './admin-artist.component.css'
})
export class AdminArtistComponent {
  constructor(private adminArtistService: AdminArtistService,private http: HttpClient) {}
  songList: Song[] = [];
  ngOnInit() {
    this.load();
  }

  toggleEdit(item: any) {
    if (item.isEditing) {
      this.update(item.id, item.editName); 
    } else {
      item.editName = item.name; 
    }
    item.isEditing = !item.isEditing;
  }

  update(id: any, name: string) {
    const data = { id: id, name: name };
    this.http.post<any>('http://localhost/Moody/php/EditNameSong.php', data)
      .subscribe({
        next: response => {
          Swal.fire(
            "Success!", 
            "Song Updated", 
            "success");
          this.load();
        },
        error: error => console.error('Error:', error)
      });
  }

  load(){
    this.adminArtistService.list().subscribe({
      next: (data: Song[]) => {
        this.songList = data
        //console.log(this.songList);
      },
      error: (error) => console.error('There was an error retrieving the songs:', error)
    });
  }

  Delete(id: any) {
    var data = { id: id };
    
    this.http.post<any>('http://localhost/Moody/php/DeleteSong.php', data)
      .subscribe(
        response => {
          Swal.fire({
            title: "Success!",
            text: "Song Deleted",
            icon: "success"
          });
          this.load();
        },
        error => {
          console.error("Error:", error);
        }
      );
  }
  
  
}