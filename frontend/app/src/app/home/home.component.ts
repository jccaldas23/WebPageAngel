import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MomentosService, Momento } from '../momentos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  momentos: Momento[] = [];
  momentoSeleccionado: Momento | null = null;
  mostrarFormulario = false;

  nuevoTitulo = '';
  nuevoDescripcion = '';
  nuevoFecha = '';
  nuevaImagen: File | null = null;

  constructor(private momentosService: MomentosService, private router: Router) {}

  ngOnInit() {
    this.cargarMomentos();
  }

  cargarMomentos() {
    this.momentosService.getMomentos().subscribe(data => {
      this.momentos = data;
    });
  }

  abrirMomento(momento: Momento) {
    this.momentoSeleccionado = momento;
  }

  cerrarMomento() {
    this.momentoSeleccionado = null;
  }

  onFileChange(event: any) {
    this.nuevaImagen = event.target.files[0];
  }

  agregarMomento() {
    const formData = new FormData();
    formData.append('titulo', this.nuevoTitulo);
    formData.append('descripcion', this.nuevoDescripcion);
    formData.append('fecha', this.nuevoFecha);
    if (this.nuevaImagen) {
      formData.append('imagen', this.nuevaImagen);
    }

    this.momentosService.crearMomento(formData).subscribe(() => {
      this.cargarMomentos();
      this.mostrarFormulario = false;
      this.nuevoTitulo = '';
      this.nuevoDescripcion = '';
      this.nuevoFecha = '';
      this.nuevaImagen = null;
    });
  }

  eliminarMomento(id: string) {
    this.momentosService.eliminarMomento(id).subscribe(() => {
      this.cargarMomentos();
      this.momentoSeleccionado = null;
    });
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}