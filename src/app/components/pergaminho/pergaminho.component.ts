import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PocaoService } from '../../core/services/pocao.service';
import { Pocao } from '../../core/models/pocao.model';

@Component({
  selector: 'app-pergaminho',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pergaminho.component.html',
  styleUrl: './pergaminho.component.css'
})
export class PergaminhoComponent implements OnInit {
  pocao: Pocao | null = null;
  carregando = true;

  constructor(private route: ActivatedRoute, private pocaoService: PocaoService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pocaoService.obterDetalhes(id).subscribe({
      next: (p) => { this.pocao = p; this.carregando = false; },
      error: () => { this.carregando = false; }
    });
  }

  classePerigo(nivel: number): string {
    if (nivel >= 5) return 'perigo-5';
    if (nivel >= 4) return 'perigo-4';
    if (nivel >= 3) return 'perigo-3';
    if (nivel >= 2) return 'perigo-2';
    return 'perigo-0';
  }
}
