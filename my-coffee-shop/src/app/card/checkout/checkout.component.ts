import { Component, OnInit } from '@angular/core';
import { ProfileDetails } from '../../types/user';
import { AuthService } from '../../user/auth-service.service';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'], // Corrected property name
})
export class CheckoutComponent implements OnInit {
  errorMessage: string = '';
  profileDetails: ProfileDetails = {
    id: '',
    imageUrl: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
  };
  products: any[] = [];
  subtotal: number = 0;

  constructor(
    private userService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load user profile
    this.userService.getProfile().subscribe({
      next: (user) => {
        if (user) {
          const {
            _id: id,
            imageUrl = '',
            username,
            email,
            phoneNumber = '',
            address = '',
          } = user;

          this.profileDetails = {
            id,
            imageUrl,
            username,
            email,
            phoneNumber,
            address,
          };
        }
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      },
    });

    // Load cart products
    this.apiService.getCard().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Failed to load cart products:', err);
      },
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const purchaseDetails = {
      username: this.profileDetails.username,
      email: this.profileDetails.email,
      phoneNumber: this.profileDetails.phoneNumber,
      address: this.profileDetails.address,
      total: this.total.toFixed(2),
      products: this.products.map((product) => product._id),
    };

    this.apiService.createPurchase(purchaseDetails).subscribe(() => {
      this.router.navigate(['/order-confirmation']);
    });
  }
  get total(): number {
    return this.products.reduce((sum, product) => {
      const price = parseFloat(product.price);
      return isNaN(price) ? sum : sum + price;
    }, 0);
  }
}
