import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({ 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProducListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imgWidth: number = 80;
  imgMargin: number = 2;
  showImage: boolean = false;
  products: IProduct[];
  filteredProducts: IProduct[];
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(v: string) {
    this._listFilter = v;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  constructor(private productService: ProductService) {}

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (ps) => {
        this.products = ps;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  performFilter(v: string): IProduct[] {
    const filterby = v.toLowerCase();
    return this.products.filter(
      (p: IProduct) => p.productName.toLowerCase().indexOf(filterby) > -1
    );
  }
  onRatingClick(message: string): void {
    console.log(`onRatingClick ${message}`);
    this.pageTitle = `Product List: ${message}`;
  }
}
