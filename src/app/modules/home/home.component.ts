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


  next(id: string): void {
    const gap: number = 0;
    const width: number = document.querySelector(`#${id}`).getBoundingClientRect().width + gap;
    document.querySelector(`#${id}`).scrollBy(width, 0)
  }

  back(id: string): void {
    const gap: number = 0;
    const width: number = document.querySelector(`#${id}`).getBoundingClientRect().width + gap;
    document.querySelector(`#${id}`).scrollBy(-width, 0)

  }
}
