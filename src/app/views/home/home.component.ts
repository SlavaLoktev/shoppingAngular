import {Component, OnInit} from '@angular/core';
import Swiper from 'swiper';
import {Category} from '../../model/Category';
import {CategoryService} from '../../data/dao/impl/CategoryService';
import {CategorySearchValues} from '../../data/dao/search/SearchObjects';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  searchCategory(categorySearchValues: CategorySearchValues): void{
    this.categoryService.findCategories(categorySearchValues).subscribe(result => {
      this.categories = result;
      console.log(result);
    });
  }

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
