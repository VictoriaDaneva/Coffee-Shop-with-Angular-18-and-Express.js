import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../types/user';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    const { imageUrl, title, price, type, author, description } = form.value;

    this.apiService
      .createProduct(imageUrl, title, price, type, author, description)
      .subscribe(() => {
        this.router.navigate(['/coffee']);
      });
  }
}
