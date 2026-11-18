import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MOCK_SESSAO, type RegistroExercicio } from '../../core/mock-data';

@Component({
  selector: 'app-execucao-treino',
  imports: [FormsModule, DecimalPipe, RouterLink],
  template: `
    <section class="pagina">
      <div class="pagina-cabecalho">
        <div>
          <h1 class="pagina-titulo">Executar treino</h1>
          <p class="pagina-subtitulo">Ficha A · Peito, ombros e tríceps</p>
        </div>
        <div class="linha">
          @if (finalizada()) {
            <span class="etiqueta etiqueta-ok">Treino finalizado</span>
          }
          <a class="botao botao-fantasma" [routerLink]="['/fichas']">Trocar ficha</a>
          <button class="botao botao-principal" type="button" (click)="iniciada.set(true)">Iniciar treino</button>
          <button class="botao" type="button" (click)="finalizar()">Finalizar</button>
        </div>
      </div>

      <div class="cartao">
        <div class="linha entre pequeno">
          <span>Progresso da sessão</span>
          <span class="mono">{{ concluidas() }} de {{ total() }} séries</span>
        </div>
        <div class="progresso margem-superior"><span [style.width.%]="progresso()"></span></div>
        <div class="linha margem-superior pequeno suave">
          <span>{{ progresso() }}% concluído</span>
          <span>Volume registrado: {{ volume() | number: '1.0-0' }} kg</span>
        </div>
      </div>

      <div class="grade grade-2 margem-superior">
        <div class="pilha">
          @for (exercicio of exercicios(); track exercicio.nome; let indiceExercicio = $index) {
            <div class="cartao">
              <div class="cartao-cabecalho">
                <div>
                  <div class="lista-titulo">{{ exercicio.nome }}</div>
                  <div class="lista-subtitulo">{{ exercicio.grupo }} · {{ exercicio.series.length }} séries</div>
                </div>
                <span class="etiqueta">último treino</span>
              </div>
              <div class="serie-grade serie-cabecalho">
                <span>Série</span><span>Peso (kg)</span><span>Repetições</span><span>OK</span>
              </div>
              @for (serie of exercicio.series; track serie.numero; let indiceSerie = $index) {
                <div class="serie-linha serie-grade" [class.fraco]="serie.concluida">
                  <div>
                    <span class="mono">{{ serie.numero }}ª</span>
                    <div class="lista-subtitulo">{{ serie.ultimo }}</div>
                  </div>
                  <input class="serie-campo" type="number" step="2.5" [ngModel]="serie.peso" (ngModelChange)="atualizar(indiceExercicio, indiceSerie, 'peso', $event)" />
                  <input class="serie-campo" type="number" [ngModel]="serie.repeticoes" (ngModelChange)="atualizar(indiceExercicio, indiceSerie, 'repeticoes', $event)" />
                  <input type="checkbox" [checked]="serie.concluida" (change)="alternar(indiceExercicio, indiceSerie)" aria-label="Série concluída" />
                </div>
              }
            </div>
          }
        </div>

        <div class="pilha">
          <div class="cartao">
            <div class="cartao-cabecalho"><span class="cartao-titulo">Descanso</span></div>
            <div class="linha entre">
              <div>
                <div class="temporizador mono">{{ formatar(restante()) }}</div>
                <div class="pequeno suave">padrão: {{ descanso() }} segundos</div>
              </div>
              <div class="campo" style="max-width: 110px">
                <label for="descanso">Segundos</label>
                <input id="descanso" type="number" min="15" max="300" step="15" [(ngModel)]="descanso" />
              </div>
            </div>
            <div class="linha margem-superior">
              <button class="botao botao-principal" type="button" (click)="iniciarTemporizador()">Iniciar temporizador</button>
              <button class="botao" type="button" (click)="pararTemporizador()">Zerar</button>
            </div>
          </div>

          <div class="cartao">
            <div class="cartao-cabecalho"><span class="cartao-titulo">Resumo da sessão</span></div>
            <div class="lista">
              <div class="lista-item"><span class="fraco">Exercícios</span><span class="mono">{{ exercicios().length }}</span></div>
              <div class="lista-item"><span class="fraco">Séries concluídas</span><span class="mono">{{ concluidas() }} / {{ total() }}</span></div>
              <div class="lista-item"><span class="fraco">Volume</span><span class="mono">{{ volume() | number: '1.0-0' }} kg</span></div>
              <div class="lista-item"><span class="fraco">Status</span><span>{{ iniciada() ? 'Em andamento' : 'Não iniciada' }}</span></div>
            </div>
          </div>

          <div class="cartao">
            <div class="cartao-cabecalho"><span class="cartao-titulo">Dica</span></div>
            <p class="pequeno suave">Registre peso e repetições e marque a série como concluída. Os dados do último treino aparecem em cada linha para comparação.</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExecucaoTreino {
  readonly exercicios = signal<RegistroExercicio[]>(structuredClone(MOCK_SESSAO));
  readonly descanso = signal(90);
  readonly restante = signal(0);
  readonly iniciada = signal(false);
  readonly finalizada = signal(false);

  private temporizador: ReturnType<typeof setInterval> | null = null;

  readonly total = computed(() => this.exercicios().reduce((soma, exercicio) => soma + exercicio.series.length, 0));
  readonly concluidas = computed(() =>
    this.exercicios().reduce((soma, exercicio) => soma + exercicio.series.filter((serie) => serie.concluida).length, 0),
  );
  readonly progresso = computed(() => (this.total() ? Math.round((this.concluidas() / this.total()) * 100) : 0));
  readonly volume = computed(() =>
    this.exercicios().reduce(
      (soma, exercicio) => soma + exercicio.series.reduce((total, serie) => total + serie.peso * serie.repeticoes, 0),
      0,
    ),
  );

  alternar(indiceExercicio: number, indiceSerie: number): void {
    this.exercicios.update((lista) =>
      lista.map((exercicio, indiceAtual) =>
        indiceAtual === indiceExercicio
          ? {
              ...exercicio,
              series: exercicio.series.map((serie, indiceSerieAtual) =>
                indiceSerieAtual === indiceSerie ? { ...serie, concluida: !serie.concluida } : serie,
              ),
            }
          : exercicio,
      ),
    );
  }

  atualizar(indiceExercicio: number, indiceSerie: number, campo: 'peso' | 'repeticoes', valor: string | number): void {
    this.exercicios.update((lista) =>
      lista.map((exercicio, indiceAtual) =>
        indiceAtual === indiceExercicio
          ? {
              ...exercicio,
              series: exercicio.series.map((serie, indiceSerieAtual) =>
                indiceSerieAtual === indiceSerie ? { ...serie, [campo]: Number(valor) || 0 } : serie,
              ),
            }
          : exercicio,
      ),
    );
  }

  iniciarTemporizador(): void {
    this.pararTemporizador();
    this.restante.set(this.descanso());
    this.temporizador = setInterval(() => {
      const atual = this.restante();
      if (atual <= 1) {
        this.pararTemporizador();
        this.restante.set(0);
      } else {
        this.restante.set(atual - 1);
      }
    }, 1000);
  }

  pararTemporizador(): void {
    if (this.temporizador !== null) clearInterval(this.temporizador);
    this.temporizador = null;
    this.restante.set(0);
  }

  finalizar(): void {
    this.iniciada.set(false);
    this.finalizada.set(true);
    this.pararTemporizador();
  }

  formatar(segundos: number): string {
    const minutos = Math.floor(segundos / 60);
    const resto = segundos % 60;
    return `${minutos}:${String(resto).padStart(2, '0')}`;
  }
}
