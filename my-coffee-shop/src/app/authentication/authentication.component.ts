import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth-service.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuthenticating = false;
      },
      error: () => {
        this.isAuthenticating = false;
      },
      complete: () => {
        this.isAuthenticating = false;
      },
    });
  }
}
