import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngredienteService } from '../../core/services/ingrediente.service';
import { Ingrediente, Elemento, Raridade } from '../../core/models/ingrediente.model';

@Component({
  selector: 'app-materia-prima',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materia-prima.component.html',
  styleUrl: './materia-prima.component.css'
})
export class MateriaPrimaComponent implements OnInit {

  ingredientes: Ingrediente[] = [];
  elementos: Elemento[] = [];
  raridades: Raridade[] = [];

  filtro = '';
  apenasAtivos = true;
  carregando = false;
  mensagem = '';
  mensagemErro = false;

  modoEdicao = false;
  selecionado: Ingrediente | null = null;

  form = this.formVazio();

  constructor(private ingredienteService: IngredienteService) {}

  ngOnInit(): void {
    this.carregar();
    this.ingredienteService.listarElementos().subscribe(e => this.elementos = e);
    this.ingredienteService.listarRaridades().subscribe(r => this.raridades = r);
  }

  carregar(): void {
    this.carregando = true;
    this.ingredienteService.listar(this.apenasAtivos, this.filtro).subscribe({
      next: (lista) => { this.ingredientes = lista; this.carregando = false; },
      error: () => { this.carregando = false; }
    });
  }

  selecionar(ing: Ingrediente): void {
    this.selecionado = ing;
    this.modoEdicao = true;
    this.form = {
      nome:        ing.nome,
      potencia:    ing.potencia,
      efeitoBase:  ing.efeitoBase,
      descricao:   ing.descricao ?? '',
      idElemento:  ing.elemento.id,
      idRaridade:  ing.raridade.id
    };
    this.mensagem = '';
  }

  novo(): void {
    this.selecionado = null;
    this.modoEdicao = false;
    this.form = this.formVazio();
    this.mensagem = '';
  }

  salvar(): void {
    if (!this.form.nome?.trim()) {
      this.exibirMensagem('O nome é obrigatório.', true); return;
    }
    if (!this.form.idElemento) {
      this.exibirMensagem('Selecione um elemento.', true); return;
    }
    if (!this.form.idRaridade) {
      this.exibirMensagem('Selecione a raridade.', true); return;
    }
    if (!this.form.efeitoBase?.trim()) {
      this.exibirMensagem('Informe o efeito base.', true); return;
    }

    // Envia apenas os IDs de elemento e raridade — o backend resolve o resto
    const payload = {
      nome:       this.form.nome,
      potencia:   this.form.potencia ?? 30,
      efeitoBase: this.form.efeitoBase,
      descricao:  this.form.descricao,
      elemento:   { id: this.form.idElemento },
      raridade:   { id: this.form.idRaridade }
    };

    if (this.modoEdicao && this.selecionado) {
      this.ingredienteService.atualizar(this.selecionado.id, payload).subscribe({
        next: () => {
          this.exibirMensagem('Ingrediente atualizado com sucesso.', false);
          this.carregar();
          this.novo();
        },
        error: (err) => this.exibirMensagem(err.error?.erro ?? 'Erro ao atualizar.', true)
      });
    } else {
      this.ingredienteService.inserir(payload).subscribe({
        next: (res: any) => {
          this.exibirMensagem(`Ingrediente registrado. (ID ${res.id})`, false);
          this.carregar();
          this.novo();
        },
        error: (err: any) => this.exibirMensagem(err.error?.erro ?? 'Erro ao inserir.', true)
      });
    }
  }

  desativar(): void {
    if (!this.selecionado) return;
    if (!confirm(`Desativar "${this.selecionado.nome}"?\nEle não poderá ser usado em novas poções.`)) return;

    this.ingredienteService.desativar(this.selecionado.id).subscribe({
      next: () => {
        this.exibirMensagem('Ingrediente desativado.', false);
        this.carregar();
        this.novo();
      },
      error: (err: any) => this.exibirMensagem(err.error?.erro ?? 'Erro ao desativar.', true)
    });
  }

  private exibirMensagem(msg: string, erro: boolean): void {
    this.mensagem = msg;
    this.mensagemErro = erro;
  }

  private formVazio() {
    return {
      nome:       '',
      potencia:   30,
      efeitoBase: '',
      descricao:  '',
      idElemento: 0,
      idRaridade: 0
    };
  }
}
