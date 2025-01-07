import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  rentals = [
    { id: 1, title: 'modern loft', location: 'downtown', price: 2000 },
    { id: 2, title: 'cozy studio', location: 'uptown', price: 1100 },
    { id: 3, title: 'luxury penthouse', location: 'city center', price: 3500 },
    { id: 4, title: 'charming bungalow', location: 'suburbs', price: 1800 },
    { id: 5, title: 'urban flat', location: 'midtown', price: 1400 },
    { id: 6, title: 'spacious villa', location: 'beachside', price: 3000 },
    { id: 7, title: 'traditional apartment', location: 'historic district', price: 1600 },
    { id: 8, title: 'minimalist studio', location: 'art district', price: 1300 },
    { id: 9, title: 'family home', location: 'residential area', price: 2200 },
    { id: 10, title: 'eco-friendly house', location: 'countryside', price: 1700 },
  ];

  favoriteRentals: any[] = [];
  favorites: number[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadFavorites();
    this.updateFavoriteRentals();
  }

  loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  updateFavoriteRentals() {
    this.favoriteRentals = this.rentals.filter((rental) =>
      this.favorites.includes(rental.id)
    );
  }

  removeFavorite(rentalId: number) {
    this.favorites = this.favorites.filter((id) => id !== rentalId);
    this.saveFavorites();
    this.updateFavoriteRentals();
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}