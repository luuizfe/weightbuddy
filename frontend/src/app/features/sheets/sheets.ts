import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOCK_FICHAS } from '../../core/mock-data';

@Component({
  selector: 'app-fichas',
  imports: [RouterLink],
  template: `
    <section class="pagina">
      <div class="pagina-cabecalho">
        <div>
          <h1 class="pagina-titulo">Meus treinos</h1>
          <p class="pagina-subtitulo">Organize suas fichas de treinamento</p>
        </div>
        <a class="botao botao-principal" [routerLink]="['/fichas/nova']">Nova ficha</a>
      </div>

      <div class="grade grade-2">
        @for (ficha of fichas; track ficha.id) {
          <div class="cartao pilha">
            <div class="linha entre">
              <h2 class="lista-titulo">{{ ficha.nome }}</h2>
              <span class="etiqueta etiqueta-destaque">{{ ficha.exercicios.length }} exercícios</span>
            </div>
            <p class="pequeno suave">{{ ficha.descricao }}</p>
            <div class="linha quebra-linha">
              @for (grupo of ficha.grupos; track grupo) {
                <span class="etiqueta">{{ grupo }}</span>
              }
            </div>
            <div class="linha entre" style="border-top: 1px solid var(--borda); padding-top: 12px">
              <a class="botao botao-pequeno" [routerLink]="['/treino']">Iniciar</a>
              <div class="linha">
                <a class="botao botao-fantasma botao-pequeno" [routerLink]="['/fichas', ficha.id]">Editar</a>
                <button class="botao botao-fantasma botao-pequeno botao-perigo" type="button">Excluir</button>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class Fichas {
  readonly fichas = MOCK_FICHAS;
}
