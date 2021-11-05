import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public value: string = '';
  constructor(private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activateRoute.params
      .subscribe((parameter) => {
        this.value = parameter.value;
      })
  }

}
