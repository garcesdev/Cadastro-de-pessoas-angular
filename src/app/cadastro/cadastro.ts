import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Pessoa {
  id?: number;
  nome: string;
  email: string;
  curso?: string;
  tipo: string;
  telefone?: string;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent {

  pessoa: Pessoa = {
    nome: '',
    email: '',
    curso: 'Engenharia de Computação',
    tipo: 'aluno',
    telefone: ''
  };

  pessoas: Pessoa[] = [
    { nome: 'Ana Souza', email: 'ana@exemplo.com', tipo: 'aluno' },
    { nome: 'Bruno Lima', email: 'bruno@exemplo.com', tipo: 'professor' }
  ];

  private validarEmail(email: string): string | null {
    if (!email) return 'E-mail é obrigatório.';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? null : 'E-mail em formato inválido.';
  }

  private validarTelefone(telefone?: string, tipo?: string): string | null {
    if (tipo === 'professor' && (!telefone || telefone.trim() === '')) {
      return 'Professor precisa informar o telefone.';
    }
    return null;
  }

  get erros() {
    return {
      email: this.validarEmail(this.pessoa.email),
      telefone: this.validarTelefone(this.pessoa.telefone, this.pessoa.tipo)
    };
  }

  get temErro(): boolean {
    return Object.values(this.erros).some(msg => msg !== null);
  }

  salvar(): void {
    if (this.temErro) return;
    this.pessoas.push({ ...this.pessoa });
    this.pessoa = { nome: '', email: '', curso: 'Engenharia de Computação', tipo: 'aluno', telefone: '' };
  }
}