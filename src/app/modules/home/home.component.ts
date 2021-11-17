import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


  }


  next(): void {

    document.querySelector('.list-novedades').scrollBy(170 * 7, 0)
  }

  back(): void {
    document.querySelector('.list-novedades').scrollBy(-170 * 7, 0)

  }
}
