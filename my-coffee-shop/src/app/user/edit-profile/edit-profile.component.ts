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
export class EditProfileComponent {
  errorMessage: string = '';
  constructor(private userService: AuthService, private router: Router) {}
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    const { imageUrl, name, email, phoneNumber, address } = form.value;

    this.userService
      .updateProfile(imageUrl, name, email, phoneNumber, address)
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
  }
}
