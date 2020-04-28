import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'api/products/products.json';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.productUrl)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts().pipe(
      map((products: IProduct[]) => products.find((p) => p.productId === id))
    );
  }

  handleError(err: HttpErrorResponse) {
    const message =
      err.error instanceof ErrorEvent
        ? `An error occured: ${err.error.message}`
        : `Server returned code: ${err.status}, error message is: ${err.message}`;
    console.log('handleError', message);
    return throwError(message);
  }
}
