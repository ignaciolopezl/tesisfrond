import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiario } from 'types/diario';


@Injectable({
  providedIn: 'root'
})
export class DiarioService {

  constructor(private http :  HttpClient) { }


  getAllDiarios(){
    return this.http.get<IDiario[]>('http://localhost:3000/api/v1/diario')
  }
  postDiario(){
    let datos = {
      TIMESTAMP_FH : 1,
      FECHA_HORA : "'11-11-2019 13:00:00','dd-mm-yyyy HH24:mi:ss'" ,
      DESCRIPCION : "post del frondend"
    }
    return this.http.post('http://localhost:3000/api/v1/diario', datos)
  }

  updateDiario() {
    let datos = {
      TIMESTAMP_FH : 1,
      FECHA_HORA : "'11-11-2019 13:00:00','dd-mm-yyyy HH24:mi:ss'" ,
      DESCRIPCION : "modificado desde del frondend"
    }
    return this.http.patch('http://localhost:3000/api/v1/diario/44', datos);
  }
  deleteDiario() {
    return this.http.delete('http://localhost:3000/api/v1/diario/44',);
  }

/*   getAllProductos() {
    return this.http.get<Producto[]>(`${environment.url_api}/products/`);
  }
  getProducto(id: string) {
    return this.http.get<Producto>(`${environment.url_api}/products/${id}`);
  }

  createProduct(product: Producto) {
    return this.http.post(`${environment.url_api}/products`, product);
  }

  updateProduct(id: string, changes: Partial<Producto>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`);
  } */

}
