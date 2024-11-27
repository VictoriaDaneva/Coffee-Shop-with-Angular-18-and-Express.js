import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { User } from '../../types/user';

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

    // const owner: User = JSON.parse(localStorage.getItem('user') || '[]');

    //  if (!owner || !owner._id) {
    //    this.errorMessage = 'User not authenticated.';
    //    return;
    //  }

    //  const { imageUrl, title, price, type, author, description } = form.value;

    //  this.productService
    //    .create({
    //      imageUrl,
    //      title,
    //      price,
    //      type,
    //      author,
    //      description,
    //      owner, // Include the User object in the payload
    //    })
    //    .subscribe({
    //      next: () => this.router.navigate(['/coffee']),
    //      error: (err) =>
    //        (this.errorMessage =
    //          err.message || 'Creation failed. Please try again.'),
    //    });
  }
}
