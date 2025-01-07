import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  // Fetch rentals from Firestore
  getRentals(): Observable<any[]> {
    const rentalsCollection = collection(this.firestore, 'rentals');
    return collectionData(rentalsCollection, { idField: 'id' });
  }

  // Fetch user-specific favorites
  getFavorites(userId: string): Observable<any[]> {
    const favoritesCollection = collection(this.firestore, 'favorites');
    const userQuery = query(favoritesCollection, where('userId', '==', userId));
    return collectionData(userQuery, { idField: 'id' });
  }

  // Add a favorite rental
  addFavorite(userId: string, rental: any): Promise<void> {
    const favoritesCollection = collection(this.firestore, 'favorites');
    return addDoc(favoritesCollection, { ...rental, userId }).then();
  }

  // Remove a favorite rental
  removeFavorite(favoriteId: string): Promise<void> {
    const favoriteDoc = doc(this.firestore, `favorites/${favoriteId}`);
    return deleteDoc(favoriteDoc);
  }
}