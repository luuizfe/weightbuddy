# WeightBuddy

Sistema de gerenciamento de treinos de academia.

## Partes do projeto

- **Backend**: Spring Boot 4.1.2, Java 21 e PostgreSQL 16 via Docker Compose. API em `http://localhost:8080`.
- **Frontend**: Angular 22.2.7 na pasta `frontend/`. Servidor de desenvolvimento em `http://localhost:4200/`.

## Backend

1. Copie `.env.example` para `.env` e preencha os valores da sua máquina.
2. Suba o banco com `docker compose up -d`.
3. Inicie a API com `.\mvnw.cmd spring-boot:run`.
4. Rode os testes com `.\mvnw.cmd clean test`.

O passo a passo completo está no `DOCKER_TUTORIAL.md`.

## Frontend

Instruções de instalação, execução, build e testes estão no `frontend/README.md`.

## Endpoint disponível

- `POST /api/users` — cadastra um usuário.

## Convenções

- Nunca colocar senha real em arquivo versionado. Use `.env`, que está no `.gitignore`.
- Nomes de arquivos e pastas do Angular seguem o padrão da ferramenta; código, textos e documentação são em português.
