import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Product } from '../../types/product';
import { AuthService } from '../../user/auth-service.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  product = {} as Product;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: AuthService
  ) {}
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
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
    });
  }
}
