import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../types/product';
import { ApiService } from '../../../api.service';
import { SlicePipe } from '../../../shared/pipes/slice.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getWishlist().subscribe((products) => {
      this.products = products;
      this.isLoading = false;
    });
  }
}
