import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileDetails } from '../../types/user';
import { AuthService } from '../auth-service.service';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PostsComponent } from './posts/posts.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, WishlistComponent, PostsComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileDetails: ProfileDetails = {
    id: '',
    imageUrl: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
  };

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
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
  }
}
