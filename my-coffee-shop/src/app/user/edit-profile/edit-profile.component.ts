import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProfileDetails } from '../../types/user';
import { AuthService } from '../auth-service.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  errorMessage: string = '';
  profileDetails: ProfileDetails = {
    id: '',
    imageUrl: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
  };
  constructor(private userService: AuthService, private router: Router) {}

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
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    const { imageUrl, username, email, phoneNumber, address } =
      this.profileDetails;

    this.userService
      .updateProfile(imageUrl, username, email, phoneNumber, address)
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
  }
}
