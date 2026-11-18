import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServicoCadastro, type RequisicaoUsuario } from '../../core/signup.service';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="pagina">
      <div class="pagina-cabecalho">
        <div>
          <h1 class="pagina-titulo">Novo usuário</h1>
          <p class="pagina-subtitulo">Cadastro integrado ao endpoint real da API</p>
        </div>
        <a class="botao botao-fantasma" [routerLink]="['/perfil']">Voltar</a>
      </div>

      <div class="cartao" style="max-width: 520px">
        <form class="pilha" (ngSubmit)="enviar()">
          <div class="campo"><label for="nome">Nome</label><input id="nome" type="text" [(ngModel)]="dados.nome" name="nome" required maxlength="100" /></div>
          <div class="campo"><label for="usuario">Usuário</label><input id="usuario" type="text" [(ngModel)]="dados.usuario" name="usuario" required maxlength="50" /></div>
          <div class="campo"><label for="email">E-mail</label><input id="email" type="email" [(ngModel)]="dados.email" name="email" required maxlength="150" /></div>
          <div class="campo"><label for="senha">Senha (mínimo 8 caracteres)</label><input id="senha" type="password" [(ngModel)]="dados.senha" name="senha" required minlength="8" /></div>

          @if (erro()) { <div class="etiqueta" style="color: var(--perigo)">{{ erro() }}</div> }
          @if (sucesso()) { <div class="etiqueta etiqueta-ok">Usuário {{ sucesso() }} cadastrado</div> }

          <div class="linha">
            <button class="botao botao-principal" type="submit" [disabled]="carregando()">
              {{ carregando() ? 'Enviando...' : 'Cadastrar' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  `,
})
export class Cadastro {
  private readonly servico = inject(ServicoCadastro);

  readonly dados: RequisicaoUsuario = { nome: '', usuario: '', senha: '', email: '' };
  readonly carregando = signal(false);
  readonly erro = signal('');
  readonly sucesso = signal('');

  enviar(): void {
    this.erro.set('');
    this.sucesso.set('');
    this.carregando.set(true);
    this.servico.criar(this.dados).subscribe({
      next: (resposta) => {
        this.carregando.set(false);
        this.sucesso.set(resposta.usuario);
      },
      error: (falha) => {
        this.carregando.set(false);
        this.erro.set(falha?.error?.message ?? 'Não foi possível cadastrar. Verifique se a API está rodando.');
      },
    });
  }
}
