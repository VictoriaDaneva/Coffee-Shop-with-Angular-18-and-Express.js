import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { ProductDetails } from '../../types/product';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  errorMessage: string = '';
  productDetails: ProductDetails = {
    id: '',
    imageUrl: '',
    title: '',
    price: '',
    type: '',
    description: '',
  };
  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.apiService.getSingleProduct(productId).subscribe({
      next: (product) => {
        if (product) {
          const {
            _id: id,
            imageUrl = '',
            title,
            price,
            type,
            description,
          } = product;

          this.productDetails = {
            id,
            imageUrl,
            title,
            price,
            type,
            description,
          };
        }
      },
      error: (err) => {
        console.error('Failed to load product:', err);
      },
    });
  }
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
