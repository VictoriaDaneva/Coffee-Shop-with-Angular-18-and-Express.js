import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../types/product';
import { ApiService } from '../../../api.service';
import { SlicePipe } from '../../../shared/pipes/slice.pipe';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPosts().subscribe((products) => {
      (this.products = products), (this.isLoading = false);
    });
  }
}
