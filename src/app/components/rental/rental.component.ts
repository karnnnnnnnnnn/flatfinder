import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
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

  filteredRentals = [...this.rentals];
  searchQuery: string = '';
  favorites: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Load favorites and query parameters
    this.loadFavorites();

    this.route.queryParams.subscribe((params) => {
      const search = params['search']?.toLowerCase().trim() || '';
      this.searchQuery = search;
      this.filterRentals();
    });
  }

  onSearchChange() {
    this.filterRentals();
  }

  private filterRentals() {
    const search = this.searchQuery.toLowerCase().trim();
    this.filteredRentals = this.rentals.filter(
      (rental) =>
        rental.title.toLowerCase().includes(search) ||
        rental.location.toLowerCase().includes(search)
    );
  }

  toggleFavorite(rentalId: number) {
    if (this.favorites.includes(rentalId)) {
      this.favorites = this.favorites.filter((id) => id !== rentalId);
    } else {
      this.favorites.push(rentalId);
    }
    this.saveFavorites();
  }

  isFavorite(rentalId: number): boolean {
    return this.favorites.includes(rentalId);
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }
}