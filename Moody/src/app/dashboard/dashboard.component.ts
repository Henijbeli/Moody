import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,NgStyle,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  adminlinks=[
    {
      number:4,
      about:"Total Users",
      icon:"fa-solid fa-user-plus p-2",
      cardColor:"#3498db",
      buttonColor:"#2980b9",
      link:"http://localhost/moody/php/admin/users/index.php"
      
    },
    {
      number:15,
      about:"Total Artists",
      icon:"fa-solid fa-palette p-2",
      cardColor:"#f1c40f",
      buttonColor:"#f39c12",
      link:"http://localhost/moody/php/admin/artistes/index.php"
    },
    {
      number:20,
      about:"Total Songs",
      icon:"fa-solid fa-music p-2",
      cardColor:"#e84118",
      buttonColor:"#c23616",
      link:"http://localhost/moody/php/admin/songs/index.php"
    },
    {
      number:70,
      about:"Users avis",
      icon:"fa-solid fa-comment p-2",
      cardColor:"#2ecc71",
      buttonColor:"#27ae60",
      link:"/"
    },
    {
      number:30,
      about:"Moody Pages ",
      icon:"fa-solid fa-screwdriver-wrench p-2",
      cardColor:"#e056fd",
      buttonColor:"#be2edd",
      link:"/"
    }
  ];

  redirectTo(url: string) {
    window.location.href = url;
  }

}
