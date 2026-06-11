import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingrediente, Elemento, Raridade } from '../models/ingrediente.model';

@Injectable({ providedIn: 'root' })
export class IngredienteService {
  private api = 'http://localhost:8080/api/ingredientes';

  constructor(private http: HttpClient) {}

  listar(apenasAtivos = true, filtro = ''): Observable<Ingrediente[]> {
    const params = new HttpParams()
      .set('apenasAtivos', apenasAtivos)
      .set('filtro', filtro);
    return this.http.get<Ingrediente[]>(this.api, { params });
  }

  buscarPorId(id: number): Observable<Ingrediente> {
    return this.http.get<Ingrediente>(`${this.api}/${id}`);
  }

  // any permite enviar apenas { id } para elemento e raridade
  inserir(payload: any): Observable<any> {
    return this.http.post(this.api, payload);
  }

  atualizar(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, payload);
  }

  desativar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  listarElementos(): Observable<Elemento[]> {
    return this.http.get<Elemento[]>(`${this.api}/elementos`);
  }

  listarRaridades(): Observable<Raridade[]> {
    return this.http.get<Raridade[]>(`${this.api}/raridades`);
  }
}
