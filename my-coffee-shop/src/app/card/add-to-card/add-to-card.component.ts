import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-add-to-card',
  standalone: true,
  imports: [RouterLink],
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

  remove() {
    const id = this.route.snapshot.params['id'];
    // this.apiService
    //   .removeFromCard(id)
    //  .subscribe(() => this.router.navigate([`/coffee`]));
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
