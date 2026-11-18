# WeightBuddy — frontend

Interface web do WeightBuddy em Angular 22.2.7: componentes standalone, rotas lazy, signals e CSS puro.

## Pré-requisitos

- Node.js 24.19 ou superior (o CLI Angular 22 exige Node 22.22.3+, 24.15+ ou 26+).
- npm 11 ou superior.

## Instalação

Na pasta `frontend/`:

```bash
npm install
```

## Rodar em desenvolvimento

Na raiz do repositório:

```bash
npm --prefix frontend start
```

Ou dentro de `frontend/`:

```bash
npm start
```

Acesse `http://localhost:4200/`. O arquivo `proxy.conf.json` encaminha as chamadas `/api` para `http://localhost:8080`.

## Gerar build

```bash
npm --prefix frontend run build
```

O resultado vai para `frontend/dist/`.

## Executar testes

```bash
npm --prefix frontend test -- --watch=false
```

## Estrutura

```text
frontend/src/app/
├── app.ts / app.html / app.css   casca da aplicação (menu lateral e barra superior)
├── app.routes.ts                 rotas lazy
├── app.config.ts                 providers de roteamento e HttpClient
├── core/
│   ├── mock-data.ts              dados falsos isolados das telas
│   └── signup.service.ts         chamada ao POST /api/users
└── features/
    ├── dashboard/                painel
    ├── sheets/                   fichas de treino
    ├── sheet-form/               formulário de ficha
    ├── exercises/                catálogo de exercícios
    ├── session/                  execução do treino
    ├── history/                  histórico
    ├── stats/                    estatísticas
    ├── profile/                  perfil
    └── signup/                   cadastro de usuário
```

Os nomes de arquivos e pastas seguem o padrão do Angular CLI. Classes, métodos, variáveis, estilos e textos estão em português.

## Telas

Painel, fichas, formulário de ficha, exercícios, execução de treino, histórico, estatísticas, perfil e cadastro.

## Dados

Apenas o cadastro chama a API real (`POST /api/users`). As demais telas usam os mocks de `core/mock-data.ts`. O backend ainda não tem login ou JWT; por isso o botão "Sair" está desabilitado.

## Backend

Consulte o `README.md` da raiz e o `DOCKER_TUTORIAL.md`.
