import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './types/product';
import { catchError, map, throwError } from 'rxjs';

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
    description: string
  ) {
    const payload = { imageUrl, title, price, type, description };
    return this.http
      .post(`/api/products`, payload)
      .pipe(catchError((error) => this.getError(error)));
  }

  updateProduct(
    productId: string,
    imageUrl: string,
    title: string,
    price: string,
    type: string,
    description: string
  ) {
    const payload = { productId, imageUrl, title, price, type, description };
    return this.http
      .post<Product>(`/api/products/${productId}/edit`, payload)
      .pipe(catchError((error) => this.getError(error)));
  }

  addToWishlist(productId: string) {
    return this.http.get<Product>(`/api/products/${productId}/like`);
  }

  deleteProduct(productId: string) {
    return this.http.delete(`/api/products/${productId}`);
  }

  getWishlist() {
    return this.http.get<Product[]>(`/api/users/profile/wishlist`);
  }

  getPosts() {
    return this.http.get<Product[]>(`/api/users/profile/posts`);
  }

  search(query: string) {
    return this.http
      .get<Product[]>(`/api/products/search?q=${query}`)
      .pipe(catchError((error) => this.getError(error)));
  }
  getLastThreePosts() {
    return this.getProducts().pipe(map((posts) => posts.slice(-3)));
  }

  private getError(error: any) {
    const errorMessage =
      error.error?.message || 'An unknown error occurred. Please try again.';
    return throwError(() => errorMessage);
  }
}
