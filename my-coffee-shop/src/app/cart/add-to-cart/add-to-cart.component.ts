import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Product } from '../../types/product';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
})
export class AddToCartComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  remove(id: string) {
    this.apiService
      .removeFromCart(id)
      .subscribe(() => window.location.reload());
  }
  navigateToCheckout() {
    if (this.products.length > 0) {
      this.router.navigate(['/cart/checkout']);
    }
  }

  ngOnInit() {
    this.apiService.getCart().subscribe((products) => {
      this.products = products;
      this.isLoading = false;
    });
  }
  get total(): number {
    return this.products.reduce((sum, product) => {
      const price = parseFloat(product.price);
      return isNaN(price) ? sum : sum + price;
    }, 0);
  }
}
