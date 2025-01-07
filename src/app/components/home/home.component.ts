import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchQuery: string = ''; // User's input for search

  constructor(private router: Router) {}

  searchRentals() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/rental'], { queryParams: { search: this.searchQuery.trim() } });
    } else {
      this.router.navigate(['/rental']); // Navigate without query parameters if search is empty
    }
  }
}