import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequisicaoUsuario {
  nome: string;
  usuario: string;
  senha: string;
  email: string;
}

export interface RespostaUsuario {
  id: number;
  nome: string;
  usuario: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ServicoCadastro {
  private readonly clienteHttp = inject(HttpClient);

  criar(dados: RequisicaoUsuario): Observable<RespostaUsuario> {
    return this.clienteHttp.post<RespostaUsuario>('/api/users', dados);
  }
}
