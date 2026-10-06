import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Cadastro,
  CampoDoFormulario,
  CamposTocados,
  CURSOS,
  Curso,
  ErrosCadastro,
  Rascunho,
  rascunhoEmBranco
} from './padrao.model';
import { validarRascunho } from './padrao.validacao';

@Component({
  selector: 'app-padrao',
  imports: [FormsModule],
  templateUrl: './padrao.html',
  styleUrl: './padrao.css'
})
export class Padrao {

  readonly titulo = 'Formulario padrao';

  
  readonly cursos: Curso[] = CURSOS;

  rascunho: Rascunho = rascunhoEmBranco();

  tocados: CamposTocados = {};

  cadastrados: Cadastro[] = [];

  get erros(): ErrosCadastro {
    return validarRascunho(this.rascunho, this.cadastrados);
  }

  get quantidadeDeErros(): number {
    return Object.keys(this.erros).length;
  }

  get temErro(): boolean {
    return this.quantidadeDeErros > 0;
  }

  deveMostrar(campo: CampoDoFormulario): boolean {
    return this.tocados[campo] === true && this.erros[campo] !== undefined;
  }

  mensagem(campo: CampoDoFormulario): string {
    return this.erros[campo] ?? '';
  }

  marcarTocado(campo: CampoDoFormulario): void {
    this.tocados[campo] = true;
  }

  
  mostrarTudo(): void {
    const campos = Object.keys(this.rascunho) as CampoDoFormulario[];
    for (const campo of campos) {
      this.tocados[campo] = true;
    }
  }

  salvar(): void {
    if (this.temErro) {
      this.mostrarTudo();
      return;
    }

    const { confirmarSenha, ...dados } = this.rascunho;
    void confirmarSenha;

    this.cadastrados = [
      ...this.cadastrados,
      { id: this.proximoId(), ...dados }
    ];

    this.limpar();
  }

  limpar(): void {
    this.rascunho = rascunhoEmBranco();
    this.tocados = {};
  }

  remover(id: number): void {
    this.cadastrados = this.cadastrados.filter(c => c.id !== id);
  }

  private proximoId(): number {
    const maior = this.cadastrados.reduce((max, c) => Math.max(max, c.id), 0);
    return maior + 1;
  }
}
