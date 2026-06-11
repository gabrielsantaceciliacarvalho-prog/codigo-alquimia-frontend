import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngredienteService } from '../../core/services/ingrediente.service';
import { PocaoService } from '../../core/services/pocao.service';
import { Ingrediente } from '../../core/models/ingrediente.model';
import { ResultadoCriacao } from '../../core/models/pocao.model';

@Component({
  selector: 'app-atanor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atanor.component.html',
  styleUrl: './atanor.component.css'
})
export class AtanorComponent implements OnInit {

  ingredientesDisponiveis: Ingrediente[] = [];
  ingredientesSelecionados: Ingrediente[] = [];
  nomePocao = '';
  misturando = false;
  resultado: ResultadoCriacao | null = null;

  constructor(
    private ingredienteService: IngredienteService,
    private pocaoService: PocaoService
  ) {}

  ngOnInit(): void {
    this.ingredienteService.listar(true).subscribe({
      next: (lista) => this.ingredientesDisponiveis = lista,
      error: (err) => console.error('Erro ao carregar ingredientes:', err)
    });
  }

  adicionar(ing: Ingrediente): void {
    if (this.ingredientesSelecionados.length >= 5) return;
    if (this.ingredientesSelecionados.find(i => i.id === ing.id)) return;
    this.ingredientesSelecionados.push(ing);
    this.resultado = null;
  }

  remover(ing: Ingrediente): void {
    this.ingredientesSelecionados = this.ingredientesSelecionados.filter(i => i.id !== ing.id);
    this.resultado = null;
  }

  estaSelecionado(ing: Ingrediente): boolean {
    return !!this.ingredientesSelecionados.find(i => i.id === ing.id);
  }

  limpar(): void {
    this.ingredientesSelecionados = [];
    this.nomePocao = '';
    this.resultado = null;
  }

  misturar(): void {
    if (this.ingredientesSelecionados.length === 0) return;
    this.misturando = true;
    this.resultado = null;

    this.pocaoService.criar({
      idsIngredientes: this.ingredientesSelecionados.map(i => i.id),
      nomePocao: this.nomePocao.trim() || undefined,
      idAlquimista: 1
    }).subscribe({
      next: (res) => {
        this.resultado = res;
        this.misturando = false;
      },
      error: () => {
        this.misturando = false;
      }
    });
  }

  nivelRaridadeClasse(raridade: string): string {
    const map: Record<string, string> = {
      'Comum': 'raridade-comum',
      'Incomum': 'raridade-incomum',
      'Raro': 'raridade-raro',
      'Épico': 'raridade-epico',
      'Lendário': 'raridade-lendario'
    };
    return map[raridade] ?? '';
  }
}
