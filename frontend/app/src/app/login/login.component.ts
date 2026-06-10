import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  usuario = '';
  contrasena = '';
  error = '';

  constructor(private router: Router) {}

  login() {
    if (this.usuario === 'angel' && this.contrasena === 'enanoPanzon') {
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/home']);
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}