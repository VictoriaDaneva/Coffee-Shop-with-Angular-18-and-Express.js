import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './types/product';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //Card functionality

  getCard() {
    return this.http.get<Product[]>(`/api/card`);
  }

  addToCard(id: string) {
    return this.http.get(`/api/card/add/${id}`);
  }
  removeFromCard(id: string) {
    return this.http.get<Product>(`/api/card/add/${id}/remove`);
  }
  //CRUD operations for products

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

  deleteProduct(productId: string) {
    return this.http.delete(`/api/products/${productId}`);
  }

  //Wishlist functionality

  removeFromWishlist(productId: string) {
    return this.http.get<Product>(`/api/products/${productId}/like/unsub`);
  }

  addToWishlist(productId: string) {
    return this.http.get<Product>(`/api/products/${productId}/like`);
  }

  //User's lists

  getWishlist() {
    return this.http.get<Product[]>(`/api/users/profile/wishlist`);
  }

  getPosts() {
    return this.http.get<Product[]>(`/api/users/profile/posts`);
  }

  // Search functionality

  search(query: string) {
    return this.http
      .get<Product[]>(`/api/products/search?q=${query}`)
      .pipe(catchError((error) => this.getError(error)));
  }
  getLastThreePosts() {
    return this.getProducts().pipe(map((posts) => posts.slice(-3)));
  }

  // Error handling

  private getError(error: any) {
    const errorMessage =
      error.error?.message || 'An unknown error occurred. Please try again.';
    return throwError(() => errorMessage);
  }
}
