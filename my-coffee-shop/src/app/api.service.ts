import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './types/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`/api/products`);
  }

  getSingleProduct(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  createProduct(
    imageUrl: string,
    title: string,
    price: string,
    type: string,
    author: string,
    description: string
  ) {
    const payload = { imageUrl, title, price, type, author, description };
    return this.http.post(`/api/products`, payload);
  }

  updateProduct(
    productId: string,
    imageUrl: string,
    title: string,
    price: string,
    type: string,
    description: string
  ) {
    const payload = { imageUrl, title, price, type, description };
    return this.http.put<Product>(`/api/products/${productId}`, payload);
  }

  deleteProduct(productId: string) {
    return this.http.delete(`/api/products/${productId}`);
  }
}
