import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {IProduct} from "../models/product";
import {catchError, delay, Observable, retry, tap, throwError} from "rxjs";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: IProduct[] = []

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products/', {
      params: new HttpParams({
        fromObject: {limit: 5}
      })
    }).pipe(
      delay(20),
      retry(2),
      tap((products) => this.products = products),
      catchError(this.errorHandler.bind(this))
    )
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('https://fakestoreapi.com/products/', product)
      .pipe(
        tap(newProduct => {
          this.products.push(newProduct)
          console.log(this.products)
        })
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
