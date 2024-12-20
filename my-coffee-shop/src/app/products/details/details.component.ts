import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Product } from '../../types/product';
import { AuthService } from '../../user/auth-service.service';
import { ListComponent } from '../../shared/list/list.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, ListComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  product = {} as Product;
  isOwner = false;
  isLiked = false;
  authorUsername = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: AuthService
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  addToCart() {
    const id = this.route.snapshot.params['id'];
    this.apiService
      .addToCart(id)
      .subscribe(() => this.router.navigate([`/cart`]));
  }

  unWishlist() {
    const id = this.route.snapshot.params['id'];
    this.apiService
      .removeFromWishlist(id)
      .subscribe(() => this.router.navigate([`/coffee`]));
  }

  wishlist() {
    const id = this.route.snapshot.params['id'];
    this.apiService
      .addToWishlist(id)
      .subscribe(() => this.router.navigate([`/coffee`]));
  }

  delete() {
    const id = this.route.snapshot.params['id'];
    this.apiService
      .deleteProduct(id)
      .subscribe(() => this.router.navigate(['/coffee']));
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.apiService.getSingleProduct(id).subscribe((product) => {
      this.product = product;

      this.authorUsername = product.owner?.username || 'Unknown Author';

      this.isLiked = product.likes.includes(String(this.userService.user?._id));

      this.isOwner =
        String(product.owner) === String(this.userService.user?._id);
    });
  }
}
