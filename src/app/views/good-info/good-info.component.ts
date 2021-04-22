import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/Product';
import {DataHandlerService} from '../../service/data-handler.service';

@Component({
  selector: 'app-good-info',
  templateUrl: './good-info.component.html',
  styleUrls: ['./good-info.component.css']
})
export class GoodInfoComponent implements OnInit {

  goodInfoCards: Product[];

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    //  this.goodInfoCards = this.dataHandler.getProductCards();
  }

}
