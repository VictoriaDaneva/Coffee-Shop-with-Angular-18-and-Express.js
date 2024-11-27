import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/coffee';

  constructor(private http: HttpClient) {}

  create(product: Product): Observable<any> {
    // Include credentials to send cookies with the request
    return this.http.post(`${this.baseUrl}/create`, product, {
      withCredentials: true,
    });
  }
}
