import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {IProduct} from "../models/product";
import {catchError, delay, Observable, retry, throwError} from "rxjs";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products/', {
      params: new HttpParams({
        fromObject: {limit: 5}
      })
    }).pipe(
      delay(20),
      retry(2),
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
