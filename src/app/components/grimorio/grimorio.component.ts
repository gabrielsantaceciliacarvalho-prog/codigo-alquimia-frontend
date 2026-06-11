import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PocaoService } from '../../core/services/pocao.service';
import { Pocao } from '../../core/models/pocao.model';

@Component({
  selector: 'app-grimorio',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './grimorio.component.html',
  styleUrl: './grimorio.component.css'
})
export class GrimorioComponent implements OnInit {
  pocoes: Pocao[] = [];
  carregando = true;
  mensagem = '';

  constructor(private pocaoService: PocaoService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.carregando = true;
    this.pocaoService.listar().subscribe({
      next: (lista) => { this.pocoes = lista; this.carregando = false; },
      error: () => { this.carregando = false; }
    });
  }

  deletar(pocao: Pocao): void {
    if (!confirm(`Remover "${pocao.nome}" dos registros permanentemente?`)) return;
    this.pocaoService.deletar(pocao.id).subscribe({
      next: () => { this.mensagem = 'Poção removida dos registros.'; this.carregar(); },
      error: (err) => { this.mensagem = err.error?.erro ?? 'Erro ao remover.'; }
    });
  }

  classePerigo(nivel: string | undefined): string {
    const map: Record<string, string> = {
      'EXTREMO': 'selo-perigo-extremo', 'ALTO': 'selo-perigo-alto',
      'MÉDIO': 'selo-perigo-medio', 'BAIXO': 'selo-perigo-baixo',
      'INOFENSIVO': 'selo-perigo-inofensivo'
    };
    return map[nivel ?? ''] ?? '';
  }
}
