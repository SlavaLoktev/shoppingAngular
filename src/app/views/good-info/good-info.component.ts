import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-good-info',
  templateUrl: './good-info.component.html',
  styleUrls: ['./good-info.component.css']
})
export class GoodInfoComponent implements OnInit {

  goodInfoCards: Product[];

  constructor() { }

  ngOnInit(): void {
  }

}
