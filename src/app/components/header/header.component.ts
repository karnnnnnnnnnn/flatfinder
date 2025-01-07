import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn = false;
  showLoginModal = false;
  showRegisterModal = false;
  errorMessages: string[] = [];
  loginValidationSuccess = false;
  registerValidationSuccess = false;

  user: { [key: string]: string } = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthdate: '',
  };

  registeredUsers: { email: string; password: string }[] = [];

  loginFields = [
    { label: 'email:', id: 'email', type: 'email' },
    { label: 'password:', id: 'password', type: 'password' },
  ];

  registerFields = [
    { label: 'email:', id: 'email', type: 'email' },
    { label: 'password:', id: 'password', type: 'password' },
    { label: 'first name:', id: 'firstName', type: 'text' },
    { label: 'last name:', id: 'lastName', type: 'text' },
    { label: 'birthdate:', id: 'birthdate', type: 'date' },
  ];

  toggleLoginModal() {
    if (this.isLoggedIn) {
      this.logoutUser();
    } else {
      this.showLoginModal = !this.showLoginModal;
      if (this.showLoginModal) {
        this.resetUserFields();
        this.errorMessages = [];
        this.loginValidationSuccess = false;
      }
    }
  }

  toggleRegisterModal() {
    this.showRegisterModal = !this.showRegisterModal;
    if (this.showRegisterModal) {
      this.resetUserFields();
      this.errorMessages = [];
      this.registerValidationSuccess = false;
    }
  }

  resetUserFields() {
    this.user = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthdate: '',
    };
  }

  validateRegister() {
    this.errorMessages = [];
    this.registerValidationSuccess = false;

    if (!this.user['email'].includes('@')) this.errorMessages.push('invalid email.');
    if (this.user['password'].length < 6) this.errorMessages.push('password too short.');
    if (!this.user['firstName']) this.errorMessages.push('first name required.');
    if (!this.user['lastName']) this.errorMessages.push('last name required.');
    if (!this.user['birthdate']) this.errorMessages.push('birthdate required.');

    if (this.errorMessages.length === 0) {
      this.registeredUsers.push({
        email: this.user['email'],
        password: this.user['password'],
      });
      this.registerValidationSuccess = true;
      setTimeout(() => {
        this.showRegisterModal = false;
        alert('successfully registered.');
      }, 1000);
    }
  }

  validateLogin() {
    this.errorMessages = [];
    this.loginValidationSuccess = false;

    const foundUser = this.registeredUsers.find(
      (u) => u.email === this.user['email'] && u.password === this.user['password']
    );

    if (!foundUser) {
      this.errorMessages.push('invalid email or password.');
    } else {
      this.loginValidationSuccess = true;
      setTimeout(() => {
        this.showLoginModal = false;
        this.isLoggedIn = true;
        alert('successfully logged in.');
      }, 1000);
    }
  }

  logoutUser() {
    this.isLoggedIn = false;
    alert('you have been logged out.');
    this.resetUserFields();
  }
}