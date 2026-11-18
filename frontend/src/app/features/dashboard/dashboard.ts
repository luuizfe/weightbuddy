import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_EVOLUCAO_CARGA, MOCK_RECORDES, MOCK_SESSOES } from '../../core/mock-data';

@Component({
  selector: 'app-painel',
  imports: [RouterLink, DecimalPipe],
  template: `
    <section class="pagina">
      <div class="pagina-cabecalho">
        <div>
          <h1 class="pagina-titulo">Bom dia, Railan</h1>
          <p class="pagina-subtitulo">Visão geral dos seus treinos</p>
        </div>
        <a class="botao botao-principal" [routerLink]="['/treino']">Iniciar treino</a>
      </div>

      <div class="grade grade-4">
        <div class="cartao">
          <div class="metrica-rotulo">Treinos na semana</div>
          <div class="metrica-valor">4</div>
          <div class="metrica-dica">meta: 5 treinos</div>
        </div>
        <div class="cartao">
          <div class="metrica-rotulo">Volume total</div>
          <div class="metrica-valor">{{ 84210 | number: '1.0-0' }}</div>
          <div class="metrica-dica">kg movimentados</div>
        </div>
        <div class="cartao">
          <div class="metrica-rotulo">Duração média</div>
          <div class="metrica-valor">56 min</div>
          <div class="metrica-dica">últimos 30 dias</div>
        </div>
        <div class="cartao">
          <div class="metrica-rotulo">Recordes</div>
          <div class="metrica-valor">7</div>
          <div class="metrica-dica">3 nos últimos 30 dias</div>
        </div>
      </div>

      <div class="grade grade-2 margem-superior">
        <div class="cartao">
          <div class="cartao-cabecalho">
            <span class="cartao-titulo">Últimos treinos</span>
            <a class="botao botao-fantasma botao-pequeno" [routerLink]="['/historico']">Ver todos</a>
          </div>
          <div class="lista">
            @for (sessao of sessoes; track sessao.id) {
              <div class="lista-item">
                <div>
                  <div class="lista-titulo">{{ sessao.ficha }}</div>
                  <div class="lista-subtitulo">{{ sessao.data }} · {{ sessao.duracao }} min · {{ sessao.exercicios.length }} exercícios</div>
                </div>
                <span class="etiqueta">{{ sessao.volume | number: '1.0-0' }} kg</span>
              </div>
            }
          </div>
        </div>

        <div class="cartao">
          <div class="cartao-cabecalho">
            <span class="cartao-titulo">Recordes recentes</span>
            <a class="botao botao-fantasma botao-pequeno" [routerLink]="['/estatisticas']">Ver todos</a>
          </div>
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

      <div class="cartao margem-superior">
        <div class="cartao-cabecalho">
          <span class="cartao-titulo">Evolução da carga — Supino reto</span>
          <span class="pequeno suave">últimas 12 semanas</span>
        </div>
        <svg class="grafico-linha" viewBox="0 0 480 64" preserveAspectRatio="none">
          <polyline [attr.points]="linha" fill="none" stroke="var(--destaque)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
          @for (ponto of pontos; track ponto.x) {
            <circle [attr.cx]="ponto.x" [attr.cy]="ponto.y" r="2" fill="var(--destaque)"></circle>
          }
        </svg>
        <div class="linha entre pequeno suave">
          <span>Início</span>
          <span>Hoje</span>
        </div>
      </div>
    </section>
  `,
})
export class Painel {
  readonly sessoes = MOCK_SESSOES.slice(0, 3);
  readonly recordes = MOCK_RECORDES.slice(0, 3);
  readonly pontos = MOCK_EVOLUCAO_CARGA.map((valor, indice) => ({
    x: 8 + indice * 42,
    y: 58 - ((valor - 60) / 30) * 48,
  }));
  readonly linha = this.pontos.map((ponto) => `${ponto.x},${ponto.y}`).join(' ');
}
