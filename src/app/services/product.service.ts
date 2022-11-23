import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../classes/product';
import { BehaviorSubject } from 'rxjs';

const URL = 'http://localhost:3500/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public search = new BehaviorSubject<string>("");
  constructor(private http:HttpClient) { }
  getProducts():Observable<Product[]>
  {
    return(this.http.get<Product[]>(URL));
  }
}
