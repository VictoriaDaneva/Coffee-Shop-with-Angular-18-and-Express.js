import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  errorMessage: string = '';
  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    const productId = this.route.snapshot.params['id'];
    const { imageUrl, title, price, type, description } = form.value;

    this.apiService
      .updateProduct(productId, imageUrl, title, price, type, description)
      .subscribe(() => {
        this.router.navigate([`/coffee/${productId}`]);
      });
  }
}
