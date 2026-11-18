import { Routes } from '@angular/router';

export const rotas: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'painel' },
  {
    path: 'painel',
    title: 'Painel | WeightBuddy',
    loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Painel),
  },
  {
    path: 'fichas',
    title: 'Meus treinos | WeightBuddy',
    loadComponent: () => import('./features/sheets/sheets').then((m) => m.Fichas),
  },
  {
    path: 'fichas/:id',
    title: 'Ficha de treino | WeightBuddy',
    loadComponent: () => import('./features/sheet-form/sheet-form').then((m) => m.FormularioFicha),
  },
  {
    path: 'exercicios',
    title: 'Exercícios | WeightBuddy',
    loadComponent: () => import('./features/exercises/exercises').then((m) => m.Exercicios),
  },
  {
    path: 'treino',
    title: 'Executar treino | WeightBuddy',
    loadComponent: () => import('./features/session/session').then((m) => m.ExecucaoTreino),
  },
  {
    path: 'historico',
    title: 'Histórico | WeightBuddy',
    loadComponent: () => import('./features/history/history').then((m) => m.Historico),
  },
  {
    path: 'estatisticas',
    title: 'Estatísticas | WeightBuddy',
    loadComponent: () => import('./features/stats/stats').then((m) => m.Estatisticas),
  },
  {
    path: 'perfil',
    title: 'Perfil | WeightBuddy',
    loadComponent: () => import('./features/profile/profile').then((m) => m.Perfil),
  },
  {
    path: 'cadastro',
    title: 'Cadastrar usuário | WeightBuddy',
    loadComponent: () => import('./features/signup/signup').then((m) => m.Cadastro),
  },
  { path: '**', redirectTo: 'painel' },
];
