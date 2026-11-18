import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_EVOLUCAO_CARGA, MOCK_RECORDES, MOCK_VOLUME_SEMANAL } from '../../core/mock-data';

@Component({
  selector: 'app-estatisticas',
  imports: [DecimalPipe, FormsModule],
  template: `
    <section class="pagina">
      <div class="pagina-cabecalho">
        <div>
          <h1 class="pagina-titulo">Estatísticas e evolução</h1>
          <p class="pagina-subtitulo">Acompanhe cargas, volume e recordes</p>
        </div>
        <div class="campo" style="min-width: 200px">
          <label for="exercicio">Exercício</label>
          <select id="exercicio" [(ngModel)]="exercicio">
            <option>Supino reto</option>
            <option>Agachamento livre</option>
            <option>Remada baixa</option>
          </select>
        </div>
      </div>

      <div class="grade grade-3">
        <div class="cartao">
          <div class="metrica-rotulo">Maior carga</div>
          <div class="metrica-valor">85 kg</div>
          <div class="metrica-dica">Agachamento livre</div>
        </div>
        <div class="cartao">
          <div class="metrica-rotulo">Maior volume</div>
          <div class="metrica-valor">26.870</div>
          <div class="metrica-dica">kg em uma semana</div>
        </div>
        <div class="cartao">
          <div class="metrica-rotulo">Recordes registrados</div>
          <div class="metrica-valor">7</div>
          <div class="metrica-dica">nos últimos 6 meses</div>
        </div>
      </div>

      <div class="cartao margem-superior">
        <div class="cartao-cabecalho">
          <span class="cartao-titulo">Evolução da carga — {{ exercicio() }}</span>
          <span class="pequeno suave">últimas 12 semanas</span>
        </div>
        <svg class="grafico-linha" viewBox="0 0 480 90" preserveAspectRatio="none">
          <line x1="0" y1="25" x2="480" y2="25" stroke="var(--borda)" stroke-width="1"></line>
          <line x1="0" y1="50" x2="480" y2="50" stroke="var(--borda)" stroke-width="1"></line>
          <line x1="0" y1="75" x2="480" y2="75" stroke="var(--borda)" stroke-width="1"></line>
          <polyline [attr.points]="linha()" fill="none" stroke="var(--destaque)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
          @for (ponto of pontos(); track ponto.x) {
            <circle [attr.cx]="ponto.x" [attr.cy]="ponto.y" r="2" fill="var(--destaque)"></circle>
          }
        </svg>
        <div class="linha entre pequeno suave"><span>Início</span><span>Hoje</span></div>
      </div>

      <div class="grade grade-2 margem-superior">
        <div class="cartao">
          <div class="cartao-cabecalho"><span class="cartao-titulo">Volume semanal</span></div>
          <div class="linha" style="align-items: flex-end; gap: 14px; height: 150px">
            @for (semana of semanas; track semana.rotulo) {
              <div class="pilha" style="align-items: center; flex: 1; gap: 6px">
                <div class="pequeno mono">{{ semana.valor | number: '1.0-0' }}</div>
                <div [style.height.px]="semana.valor / 300" style="width: 100%; max-width: 46px; background: var(--destaque); border-radius: 4px 4px 0 0"></div>
                <div class="pequeno suave">{{ semana.rotulo }}</div>
              </div>
            }
          </div>
        </div>

        <div class="cartao">
          <div class="cartao-cabecalho"><span class="cartao-titulo">Recordes pessoais</span></div>
          <div class="lista">
            @for (recorde of recordes; track recorde.exercicio) {
              <div class="lista-item">
                <div>
                  <div class="lista-titulo">{{ recorde.exercicio }}</div>
                  <div class="lista-subtitulo">{{ recorde.tipo }} · {{ recorde.data }}</div>
                </div>
                <span class="etiqueta etiqueta-destaque">{{ recorde.valor }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Estatisticas {
  readonly exercicio = signal('Supino reto');
  readonly semanas = MOCK_VOLUME_SEMANAL;
  readonly recordes = MOCK_RECORDES;

  readonly pontos = computed(() =>
    MOCK_EVOLUCAO_CARGA.map((valor, indice) => ({
      x: 8 + indice * 42,
      y: 82 - ((valor - 55) / 40) * 68,
    })),
  );

  readonly linha = computed(() => this.pontos().map((ponto) => `${ponto.x},${ponto.y}`).join(' '));
}
