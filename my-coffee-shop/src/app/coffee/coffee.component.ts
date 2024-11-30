import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { RouterLink } from '@angular/router';
import { Product } from '../types/product';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-coffee',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './coffee.component.html',
  styleUrl: './coffee.component.css',
})
export class CoffeeComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getProducts().subscribe((products) => {
      this.products = products;
      this.isLoading = false;
    });
  }
}
