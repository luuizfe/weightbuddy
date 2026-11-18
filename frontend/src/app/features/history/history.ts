import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_SESSOES } from '../../core/mock-data';

@Component({
  selector: 'app-historico',
  imports: [RouterLink, DecimalPipe],
  template: `
    <section class="pagina">
      <div class="pagina-cabecalho">
        <div>
          <h1 class="pagina-titulo">Histórico de treinos</h1>
          <p class="pagina-subtitulo">Consulte suas sessões anteriores</p>
        </div>
        <a class="botao" [routerLink]="['/estatisticas']">Ver estatísticas</a>
      </div>

      <div class="pilha">
        @for (sessao of sessoes; track sessao.id) {
          <div class="cartao">
            <button class="linha entre" style="width: 100%; background: none; border: 0; color: inherit; cursor: pointer; padding: 0" type="button" (click)="alternar(sessao.id)">
              <div class="linha">
                <span class="etiqueta etiqueta-destaque">{{ sessao.ficha }}</span>
                <div>
                  <div class="lista-titulo">{{ sessao.data }}</div>
                  <div class="lista-subtitulo">{{ sessao.duracao }} min · {{ sessao.exercicios.length }} exercícios · {{ sessao.volume | number: '1.0-0' }} kg</div>
                </div>
              </div>
              <span class="fraco">{{ aberta() === sessao.id ? '−' : '+' }}</span>
            </button>

            @if (aberta() === sessao.id) {
              <div class="margem-superior">
                <table class="tabela">
                  <thead><tr><th>Exercício</th><th>Séries</th><th>Carga</th><th>Repetições</th></tr></thead>
                  <tbody>
                    @for (exercicio of sessao.exercicios; track exercicio.nome) {
                      <tr>
                        <td>{{ exercicio.nome }}</td>
                        <td class="mono">{{ exercicio.series }}</td>
                        <td class="mono">{{ exercicio.carga }} kg</td>
                        <td class="mono">{{ exercicio.repeticoes }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class Historico {
  readonly sessoes = MOCK_SESSOES;
  readonly aberta = signal<number | null>(null);

  alternar(id: number): void {
    this.aberta.set(this.aberta() === id ? null : id);
  }
}
