import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CreateComponent } from './products/create/create.component';
import { CoffeeComponent } from './coffee/coffee.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorComponent } from './error/error.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { DetailsComponent } from './products/details/details.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { SearchComponent } from './products/search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/edit/:id', component: EditProfileComponent },

  { path: 'search', component: SearchComponent },
  { path: 'create', component: CreateComponent },
  { path: 'coffee', component: CoffeeComponent },
  { path: 'coffee/:id', component: DetailsComponent },
  { path: 'coffee/:id/edit', component: EditProductComponent },

  { path: 'about-us', component: AboutUsComponent },

  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
