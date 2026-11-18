import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface ItemNavegacao {
  rotulo: string;
  caminho: string;
  icone: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class Aplicativo {
  readonly menuAberto = signal(false);

  readonly navegacao: ItemNavegacao[] = [
    { rotulo: 'Painel', caminho: 'painel', icone: 'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9 21v-6h6v6' },
    { rotulo: 'Meus treinos', caminho: 'fichas', icone: 'M4 4h16v16H4zM8 4v16M12 9h5M12 13h5' },
    { rotulo: 'Exercícios', caminho: 'exercicios', icone: 'M6 4v16M18 4v16M3 8h6M15 8h6M3 16h6M15 16h6' },
    { rotulo: 'Executar treino', caminho: 'treino', icone: 'M8 5v14l11-7z' },
    { rotulo: 'Histórico', caminho: 'historico', icone: 'M12 8v4l3 2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9z' },
    { rotulo: 'Estatísticas', caminho: 'estatisticas', icone: 'M4 20V10M10 20V4M16 20v-7M2 20h20' },
    { rotulo: 'Perfil', caminho: 'perfil', icone: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0' },
  ];

  fecharMenu(): void {
    this.menuAberto.set(false);
  }
}
