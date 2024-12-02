import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../types/product';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchProducts: Product[] = [];
  query: string = '';
  isLoading = true;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'];
      if (this.query) {
        this.apiService.search(this.query).subscribe((result) => {
          this.searchProducts = result;
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }
}