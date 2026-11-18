import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MOCK_EXERCICIOS } from '../../core/mock-data';

@Component({
  selector: 'app-exercicios',
  imports: [FormsModule],
  template: `
    <section class="pagina">
      <div class="pagina-cabecalho">
        <div>
          <h1 class="pagina-titulo">Exercícios</h1>
          <p class="pagina-subtitulo">Catálogo de exercícios disponíveis</p>
        </div>
        <button class="botao botao-principal" type="button">Novo exercício</button>
      </div>

      <div class="cartao">
        <div class="grade grade-2">
          <div class="campo">
            <label for="busca">Pesquisar por nome</label>
            <input id="busca" type="search" placeholder="Ex.: supino" [(ngModel)]="busca" />
          </div>
          <div class="campo">
            <label for="grupo">Grupo muscular</label>
            <select id="grupo" [(ngModel)]="grupo">
              @for (opcao of grupos; track opcao) { <option [value]="opcao">{{ opcao }}</option> }
            </select>
          </div>
        </div>
      </div>

      <div class="cartao margem-superior">
        <div class="cartao-cabecalho">
          <span class="cartao-titulo">{{ filtrados().length }} exercícios</span>
        </div>
        <table class="tabela">
          <thead>
            <tr><th>Exercício</th><th>Grupo muscular</th><th>Equipamento</th><th></th></tr>
          </thead>
          <tbody>
            @for (exercicio of filtrados(); track exercicio.id) {
              <tr>
                <td>{{ exercicio.nome }}</td>
                <td><span class="etiqueta">{{ exercicio.grupo }}</span></td>
                <td class="fraco">{{ exercicio.equipamento }}</td>
                <td class="linha" style="justify-content: flex-end; gap: 4px">
                  <button class="botao botao-fantasma botao-pequeno" type="button">Editar</button>
                  <button class="botao botao-fantasma botao-pequeno botao-perigo" type="button">Excluir</button>
                </td>
              </tr>
            } @empty {
              <tr><td colspan="4" class="vazio">Nenhum exercício encontrado</td></tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class Exercicios {
  readonly busca = signal('');
  readonly grupo = signal('Todos');
  readonly grupos = ['Todos', ...Array.from(new Set(MOCK_EXERCICIOS.map((exercicio) => exercicio.grupo)))];

  readonly filtrados = computed(() => {
    const termo = this.busca().trim().toLowerCase();
    const grupoSelecionado = this.grupo();
    return MOCK_EXERCICIOS.filter(
      (exercicio) =>
        (grupoSelecionado === 'Todos' || exercicio.grupo === grupoSelecionado) &&
        (!termo || exercicio.nome.toLowerCase().includes(termo)),
    );
  });
}
