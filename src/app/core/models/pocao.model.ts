import { Ingrediente } from './ingrediente.model';

export interface Efeito {
  nome: string;
  descricao?: string;
  nivelPerigo: number;
  intensidade: number;
  ehDominante: boolean;
  tipoEfeito: string;
}

export interface Pocao {
  id: number;
  nome: string;
  potenciaTotal: number;
  estabilidade: string;
  hashIngredientes?: string;
  alquimista?: string;
  nivelPerigo?: string;
  efeitoDominante?: string;
  descricao?: string;
  dataCriacao?: string;
  ingredientes?: Ingrediente[];
  efeitos?: Efeito[];
}

export interface CriarPocaoRequest {
  idsIngredientes: number[];
  nomePocao?: string;
  idAlquimista: number;
}

export interface ResultadoCriacao {
  idPocao: number;
  tipo: 'SUCESSO' | 'DUPLICATA' | 'ERRO';
  mensagem: string;
  pocao?: Pocao;
}
