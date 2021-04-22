import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: Category[];

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    // this.categories = this.dataHandler.getCategories();
    this.dataHandler.categoriesSubject.subscribe(categories => this.categories = categories);
  }

  showProductCardsByCategory(category: Category): void {
    this.dataHandler.fillProductCardsByCategory(category);
  }
}
