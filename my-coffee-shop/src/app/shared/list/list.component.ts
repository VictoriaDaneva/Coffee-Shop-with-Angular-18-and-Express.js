import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../types/product';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getLastThreePosts().subscribe((products) => {
      this.products = products;
      this.isLoading = false;
    });
  }
}
