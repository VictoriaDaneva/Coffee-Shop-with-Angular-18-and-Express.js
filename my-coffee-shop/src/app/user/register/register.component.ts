import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const {
      imageUrl,
      username,
      email,
      phoneNumber,
      address,
      password,
      rePassword,
    } = form.value;

    if (password !== rePassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.authService
      .register(
        imageUrl,
        username,
        email,
        phoneNumber,
        address,
        password,
        rePassword
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error;
        },
      });
  }
}
