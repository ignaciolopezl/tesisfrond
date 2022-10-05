import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContenido } from 'types/contenido';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  constructor(private http :  HttpClient) { }
  getAllContenido() {
    return this.http.get<IContenido[]>('http://localhost:3000/api/v1/contenido');
  }
  getContenido(id: string) {
    return this.http.get<IContenido>(`http://localhost:3000/api/v1/contenido/${id}`);
  }

  createContenido(Contenido: any) {
    return this.http.post<IContenido>(`http://localhost:3000/api/v1/contenido`, Contenido);
  }

  updateContenido(id: string, changes: any) {
    return this.http.patch(`http://localhost:3000/api/v1/contenido/${id}`, changes);
  }

  deleteContenido(id: string) {
    return this.http.delete(`http://localhost:3000/api/v1/contenido/${id}`);
  }
}
