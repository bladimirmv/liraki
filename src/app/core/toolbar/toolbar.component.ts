import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public modeSidenav = 'side';
  public breakpoint: boolean;
  private destroy$: Subject<any> = new Subject<any>();

  constructor(private breakpointObserver: BreakpointObserver) { }
  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 700px)')
      .pipe(
        takeUntil(this.destroy$),
        map(res => res.matches),
        shareReplay()
      ).subscribe(res => this.breakpoint = res);

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
