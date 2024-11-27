import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const { imageUrl, title, price, type, author, description } = form.value;

    this.productService
      .create({ imageUrl, title, price, type, author, description })
      .subscribe({
        next: () => this.router.navigate(['/coffee']),
        error: (err) =>
          (this.errorMessage =
            err.message || 'Registration failed. Please try again.'),
      });
  }
}
