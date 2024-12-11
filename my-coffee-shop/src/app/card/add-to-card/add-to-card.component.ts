import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Product } from '../../types/product';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-add-to-card',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './add-to-card.component.html',
  styleUrl: './add-to-card.component.css',
})
export class AddToCardComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  remove(id: string) {
    this.apiService
      .removeFromCard(id)
      .subscribe(() => this.router.navigate([`/coffee`]));
  }

  ngOnInit() {
    this.apiService.getCard().subscribe((products) => {
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
