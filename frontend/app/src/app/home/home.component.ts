import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Momento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha?: string;
  imagen: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  momentoSeleccionado: Momento | null = null;

  momentos: Momento[] = [
    { id: 1, titulo: 'Primer día juntos', descripcion: 'El día que todo empezó...', fecha: 'Enero 2025', imagen: '', color: 'bg-tierra-200' },
    { id: 2, titulo: 'Viaje a la costa', descripcion: 'El mar, el sol y tú.', fecha: 'Marzo 2025', imagen: '', color: 'bg-tierra-300' },
    { id: 3, titulo: 'Cumpleaños', descripcion: 'Un día especial para celebrarte.', fecha: 'Mayo 2025', imagen: '', color: 'bg-tierra-200' },
    { id: 4, titulo: 'Senderismo', descripcion: 'Subimos alto, juntos.', fecha: 'Julio 2025', imagen: '', color: 'bg-tierra-300' },
    { id: 5, titulo: 'Noche de películas', descripcion: 'Palomitas y mucha risa.', fecha: 'Septiembre 2025', imagen: '', color: 'bg-tierra-200' },
  ];

  abrirMomento(momento: Momento) {
    this.momentoSeleccionado = momento;
  }

  cerrarMomento() {
    this.momentoSeleccionado = null;
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  constructor(private router: Router) {}
}