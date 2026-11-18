import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule],
  template: `
    <section class="pagina">
      <div class="pagina-cabecalho">
        <div>
          <h1 class="pagina-titulo">Perfil e configurações</h1>
          <p class="pagina-subtitulo">Dados pessoais e preferências da aplicação</p>
        </div>
        @if (salvo()) { <span class="etiqueta etiqueta-ok">Alterações salvas</span> }
      </div>

      <div class="grade grade-2">
        <div class="cartao">
          <div class="cartao-cabecalho"><span class="cartao-titulo">Dados pessoais</span></div>
          <div class="pilha">
            <div class="campo"><label for="nome">Nome</label><input id="nome" type="text" [(ngModel)]="nome" /></div>
            <div class="campo"><label for="usuario">Usuário</label><input id="usuario" type="text" [(ngModel)]="usuario" /></div>
            <div class="campo"><label for="email">E-mail</label><input id="email" type="email" [(ngModel)]="email" /></div>
          </div>
        </div>

        <div class="pilha">
          <div class="cartao">
            <div class="cartao-cabecalho"><span class="cartao-titulo">Preferências</span></div>
            <div class="pilha">
              <div class="campo">
                <label for="temporizador">Intervalo padrão do descanso (segundos)</label>
                <input id="temporizador" type="number" min="15" max="300" step="15" [(ngModel)]="temporizador" />
              </div>
              <div class="campo">
                <label for="unidade">Unidade de peso</label>
                <select id="unidade" [(ngModel)]="unidade"><option>Quilogramas (kg)</option><option>Libras (lb)</option></select>
              </div>
            </div>
          </div>

          <div class="cartao">
            <div class="cartao-cabecalho"><span class="cartao-titulo">Conta</span></div>
            <p class="pequeno suave">A autenticação ainda não está disponível no backend. O cadastro de usuário já utiliza a API real.</p>
            <div class="linha margem-superior">
              <button class="botao botao-principal" type="button" (click)="salvar()">Salvar alterações</button>
              <button class="botao" type="button" disabled title="Disponível quando o login existir no backend">Sair</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Perfil {
  readonly nome = signal('Railan');
  readonly usuario = signal('railan');
  readonly email = signal('railan@email.com');
  readonly temporizador = signal(90);
  readonly unidade = signal('Quilogramas (kg)');
  readonly salvo = signal(false);

  salvar(): void {
    this.salvo.set(true);
  }
}
