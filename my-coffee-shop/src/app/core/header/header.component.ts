import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../user/auth-service.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('toggleSearch', [
      state(
        'closed',
        style({
          width: '0px',
          opacity: 0,
          visibility: 'hidden',
        })
      ),
      state(
        'open',
        style({
          width: '200px',
          opacity: 1,
          visibility: 'visible',
        })
      ),
      transition('closed <=> open', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class HeaderComponent {
  searchQuery: string = '';
  isSearchActive: boolean = false;

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: AuthService, private router: Router) {}

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

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
