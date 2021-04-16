import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  slider(): void{
    const swiper = new Swiper('.swiper-container', {
      loop: true,

      // Navigation arrows
      navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

  ngOnInit(): void {
    this.slider();
  }

}
