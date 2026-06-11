export interface Elemento {
  id: number;
  nome: string;
  simbolo: string;
  descricao?: string;
}

export interface Raridade {
  id: number;
  nome: string;
  multiplicadorPotencia: number;
  descricao?: string;
}

export interface Ingrediente {
  id: number;
  nome: string;
  elemento: Elemento;
  raridade: Raridade;
  potencia: number;
  potenciaReal: number;
  efeitoBase: string;
  descricao?: string;
  ativo: boolean;
  dataCadastro?: string;
}
