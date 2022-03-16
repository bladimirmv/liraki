import { takeUntil } from 'rxjs/operators';
import { environment } from '@env/environment';
import { CategoriaProducto } from '@app/shared/models/liraki/categoria.producto.interface';
import { CategoriaProductoService } from './../../core/services/liraki/categoria-producto.service';
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  private API_URL = environment.API_URL;

  public categorias: Array<CategoriaProducto> = [] as CategoriaProducto[];
  private pageNum: number = 1;
  public showButton: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _categoriaSvc: CategoriaProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollY = window.scrollY;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (scrollY || scrollTop) > 200;
  }

  ngOnInit(): void {
    this._categoriaSvc.getAllCategoriaProductoByPage(1).subscribe((res) => {
      this.categorias = res;
    });
  }

  public queryParams(categoria): void {
    this._router.navigate(['/search', categoria]);
  }

  public onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  public onScrollDown(): void {
    this.pageNum++;
    this._categoriaSvc
      .getAllCategoriaProductoByPage(this.pageNum)
      .subscribe((categorias: CategoriaProducto[]) => {
        this.categorias = this.categorias.concat(categorias);
      });
  }

  public getImage(keyName: string): string {
    return `${this.API_URL}/api/file/${keyName}`;
  }
}
