import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnalytics, getAnalytics, ScreenTrackingService } from '@angular/fire/analytics';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "flatfinder-project",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "", // Add the measurementId here
};

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics()), // Enable Analytics
    ScreenTrackingService, // Optional: Tracks screen views automatically
  ],
}).catch((err) => console.error(err));