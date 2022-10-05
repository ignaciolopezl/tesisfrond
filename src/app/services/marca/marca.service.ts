import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMarca } from 'types/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http :  HttpClient) { }

  getAllMarcas() {
    return this.http.get<IMarca[]>('http://localhost:3000/api/v1/marca');
  }
  getMarca(id: string) {
    return this.http.get<IMarca>(`http://localhost:3000/api/v1/marca/${id}`);
  }

  createMarca(Marca: any) {
    return this.http.post<IMarca>('http://localhost:3000/api/v1/marca', Marca);
  }

  updateMarca(id: string, changes: any) {
    return this.http.patch(`http://localhost:3000/api/v1/marca/${id}`, changes);
  }

  deleteMarca(id: string) {
    return this.http.delete(`http://localhost:3000/api/v1/marca/${id}`);
  }
}
