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
import { AuthGuestGuard } from './guard/auth.guard';
import { AuthUserGuard } from './guard/auth-user.guard';
import { AuthPostGuard } from './guard/auth-post.guard';
import { AddToCardComponent } from './card/add-to-card/add-to-card.component';
import { CheckoutComponent } from './card/checkout/checkout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent, canActivate: [AuthUserGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'card/checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuestGuard],
  },
  {
    path: 'card',
    component: AddToCardComponent,
    canActivate: [AuthGuestGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuestGuard],
  },
  {
    path: 'profile/edit/:id',
    component: EditProfileComponent,
    canActivate: [AuthPostGuard],
  },

  { path: 'search', component: SearchComponent },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuestGuard] },
  { path: 'coffee', component: CoffeeComponent },
  { path: 'coffee/:id', component: DetailsComponent },
  {
    path: 'coffee/:id/edit',
    component: EditProductComponent,
    canActivate: [AuthPostGuard],
  },

  { path: 'about-us', component: AboutUsComponent },

  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
