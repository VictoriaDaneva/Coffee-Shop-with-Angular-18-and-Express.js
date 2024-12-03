import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../user/auth-service.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchQuery: string = '';
  isSearchExpanded = false;
  isSearchActive: boolean = false;

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: AuthService, private router: Router) {}

  onSearch() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery },
      });
    }
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
