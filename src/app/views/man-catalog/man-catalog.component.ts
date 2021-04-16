import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-man-catalog',
  templateUrl: './man-catalog.component.html',
  styleUrls: ['./man-catalog.component.css']
})
export class ManCatalogComponent implements OnInit {

  constructor() { }

  leftbar(): void{
    const coll = document.getElementsByClassName('collapsible');
    let i;

    for (i = 0; i < coll.length; i++) {
      // tslint:disable-next-line:typedef
      coll[i].addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  }

  ngOnInit(): void {
    this.leftbar();
  }

}
