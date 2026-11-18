import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MOCK_EXERCICIOS, MOCK_FICHAS, type Exercicio, type ExercicioFicha } from '../../core/mock-data';

@Component({
  selector: 'app-formulario-ficha',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="pagina">
      <div class="pagina-cabecalho">
        <div>
          <h1 class="pagina-titulo">{{ nome() || 'Nova ficha' }}</h1>
          <p class="pagina-subtitulo">Monte a sequência de exercícios da ficha</p>
        </div>
        <div class="linha">
          @if (salvo()) {
            <span class="etiqueta etiqueta-ok">Salvo localmente</span>
          }
          <a class="botao botao-fantasma" [routerLink]="['/fichas']">Voltar</a>
          <button class="botao botao-principal" type="button" (click)="salvar()">Salvar ficha</button>
        </div>
      </div>

      <div class="cartao">
        <div class="grade grade-2">
          <div class="campo">
            <label for="nome">Nome da ficha</label>
            <input id="nome" type="text" placeholder="Ex.: Ficha A" [(ngModel)]="nome" />
          </div>
          <div class="campo">
            <label for="descricao">Descrição</label>
            <input id="descricao" type="text" placeholder="Ex.: Peito, ombros e tríceps" [(ngModel)]="descricao" />
          </div>
        </div>
      </div>

      <div class="grade grade-2 margem-superior">
        <div class="cartao">
          <div class="cartao-cabecalho"><span class="cartao-titulo">Catálogo de exercícios</span></div>
          <div class="campo">
            <label for="busca">Buscar exercício</label>
            <input id="busca" type="search" placeholder="Nome do exercício" [(ngModel)]="busca" />
          </div>
          <div class="lista margem-superior">
            @for (exercicio of resultados(); track exercicio.id) {
              <div class="lista-item">
                <div>
                  <div class="lista-titulo">{{ exercicio.nome }}</div>
                  <div class="lista-subtitulo">{{ exercicio.grupo }} · {{ exercicio.equipamento }}</div>
                </div>
                <button class="botao botao-pequeno" type="button" (click)="adicionar(exercicio)">Adicionar</button>
              </div>
            } @empty {
              <div class="vazio">Nenhum exercício encontrado</div>
            }
          </div>
        </div>

        <div class="cartao">
          <div class="cartao-cabecalho">
            <span class="cartao-titulo">Exercícios da ficha</span>
            <span class="etiqueta">{{ exercicios().length }}</span>
          </div>
          <div class="serie-grade serie-cabecalho">
            <span>Exercício</span><span>Séries</span><span>Repetições</span><span></span>
          </div>
          @for (exercicio of exercicios(); track exercicio.exercicioId; let indice = $index) {
            <div class="serie-linha serie-grade">
              <div>
                <div class="lista-titulo pequeno">{{ exercicio.nome }}</div>
                <div class="lista-subtitulo">{{ exercicio.grupo }}</div>
              </div>
              <input class="serie-campo" type="number" min="1" max="10" [ngModel]="exercicio.series" (ngModelChange)="atualizar(indice, 'series', $event)" />
              <input class="serie-campo" type="text" [ngModel]="exercicio.repeticoes" (ngModelChange)="atualizar(indice, 'repeticoes', $event)" />
              <div class="linha" style="gap: 2px">
                <button class="botao botao-fantasma botao-pequeno" type="button" (click)="mover(indice, -1)" aria-label="Subir">↑</button>
                <button class="botao botao-fantasma botao-pequeno" type="button" (click)="mover(indice, 1)" aria-label="Descer">↓</button>
                <button class="botao botao-fantasma botao-pequeno botao-perigo" type="button" (click)="remover(exercicio.exercicioId)" aria-label="Remover">×</button>
              </div>
            </div>
          } @empty {
            <div class="vazio margem-superior">Adicione exercícios pelo catálogo</div>
          }
        </div>
      </div>
    </section>
  `,
})
export class FormularioFicha {
  private readonly rota = inject(ActivatedRoute);

  readonly nome = signal('');
  readonly descricao = signal('');
  readonly busca = signal('');
  readonly salvo = signal(false);
  readonly exercicios = signal<ExercicioFicha[]>([]);

  readonly resultados = computed(() => {
    const termo = this.busca().trim().toLowerCase();
    return MOCK_EXERCICIOS.filter((exercicio) => !termo || exercicio.nome.toLowerCase().includes(termo));
  });

  constructor() {
    const ficha = MOCK_FICHAS.find((ficha) => ficha.id === this.rota.snapshot.paramMap.get('id'));
    if (ficha) {
      this.nome.set(ficha.nome);
      this.descricao.set(ficha.descricao);
      this.exercicios.set([...ficha.exercicios]);
    }
  }

  adicionar(exercicio: Exercicio): void {
    if (this.exercicios().some((item) => item.exercicioId === exercicio.id)) return;
    this.exercicios.update((lista) => [
      ...lista,
      { exercicioId: exercicio.id, nome: exercicio.nome, grupo: exercicio.grupo, series: 3, repeticoes: '10' },
    ]);
    this.salvo.set(false);
  }

  remover(id: number): void {
    this.exercicios.update((lista) => lista.filter((item) => item.exercicioId !== id));
    this.salvo.set(false);
  }

  mover(indice: number, delta: number): void {
    const destino = indice + delta;
    if (destino < 0 || destino >= this.exercicios().length) return;
    this.exercicios.update((lista) => {
      const copia = [...lista];
      [copia[indice], copia[destino]] = [copia[destino], copia[indice]];
      return copia;
    });
    this.salvo.set(false);
  }

  atualizar(indice: number, campo: 'series' | 'repeticoes', valor: string | number): void {
    this.exercicios.update((lista) =>
      lista.map((item, indiceAtual) => (indiceAtual === indice ? { ...item, [campo]: campo === 'series' ? Number(valor) : String(valor) } : item)),
    );
    this.salvo.set(false);
  }

  salvar(): void {
    this.salvo.set(true);
  }
}
