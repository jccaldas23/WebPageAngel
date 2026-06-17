import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Momento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha?: string;
  imagen?: string;
}

@Injectable({ providedIn: 'root' })
export class MomentosService {
  private apiUrl = 'https://webpageangel-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  getMomentos() {
    return this.http.get<Momento[]>(`${this.apiUrl}/momentos`);
  }

  crearMomento(formData: FormData) {
    return this.http.post<Momento>(`${this.apiUrl}/momentos`, formData);
  }

  eliminarMomento(id: string) {
    return this.http.delete(`${this.apiUrl}/momentos/${id}`);
  }
}