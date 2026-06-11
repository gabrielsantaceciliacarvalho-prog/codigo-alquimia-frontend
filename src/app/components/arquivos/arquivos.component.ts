import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PocaoService } from '../../core/services/pocao.service';
import { Pocao } from '../../core/models/pocao.model';

@Component({
  selector: 'app-arquivos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './arquivos.component.html',
  styleUrl: './arquivos.component.css'
})
export class ArquivosComponent {
  termo = '';
  pocoes: Pocao[] = [];
  buscou = false;
  carregando = false;

  constructor(private pocaoService: PocaoService) {}

  buscar(): void {
    this.carregando = true;
    this.pocaoService.listar(this.termo).subscribe({
      next: (lista) => { this.pocoes = lista; this.buscou = true; this.carregando = false; },
      error: () => { this.carregando = false; }
    });
  }

  limpar(): void { this.termo = ''; this.pocoes = []; this.buscou = false; }

  classePerigo(nivel: string | undefined): string {
    const map: Record<string, string> = {
      'EXTREMO': 'selo-perigo-extremo', 'ALTO': 'selo-perigo-alto',
      'MÉDIO': 'selo-perigo-medio', 'BAIXO': 'selo-perigo-baixo',
      'INOFENSIVO': 'selo-perigo-inofensivo'
    };
    return map[nivel ?? ''] ?? '';
  }
}
