import { Routes } from '@angular/router';
import { RentalComponent } from './components/rental/rental.component';
import { HomeComponent } from './components/home/home.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rental', component: RentalComponent },
  { path: 'favorite', component: FavoriteComponent },
];