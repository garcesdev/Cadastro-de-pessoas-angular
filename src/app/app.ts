import { Component } from '@angular/core';
import { CadastroComponent } from './cadastro/cadastro';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CadastroComponent], // Adiciona o cadastro aqui
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}