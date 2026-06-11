import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pocao, CriarPocaoRequest, ResultadoCriacao } from '../models/pocao.model';

@Injectable({ providedIn: 'root' })
export class PocaoService {
  private api = 'http://localhost:8080/api/pocoes';

  constructor(private http: HttpClient) {}

  listar(termo = ''): Observable<Pocao[]> {
    const params = new HttpParams().set('termo', termo);
    return this.http.get<Pocao[]>(this.api, { params });
  }

  obterDetalhes(id: number): Observable<Pocao> {
    return this.http.get<Pocao>(`${this.api}/${id}`);
  }

  criar(req: CriarPocaoRequest): Observable<ResultadoCriacao> {
    return this.http.post<ResultadoCriacao>(`${this.api}/criar`, req);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
