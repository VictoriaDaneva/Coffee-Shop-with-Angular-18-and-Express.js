import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListComponent } from '../shared/list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
