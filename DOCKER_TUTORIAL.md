# Como rodar o weightbuddy

## Passo 1 — Verificar JDK 21

```powershell
java -version
```

Precisa aparecer `21` ou mais. Se não aparecer, instale: https://adoptium.net

## Passo 2 — Instalar WSL2

PowerShell **como administrador**:

```
wsl --install
```

Reinicie o PC e aperte **Y**. Depois do reboot, espere o instalador terminar.

## Passo 3 — Instalar Docker Desktop

1. Baixe: https://www.docker.com/products/docker-desktop/
2. Instale com **"Use WSL 2 backend"** marcado
3. Abra o Docker Desktop e espere o ícone da bandeja ficar sem erro

## Passo 4 — Clonar e configurar o `.env`

```powershell
git clone https://github.com/luuizfe/weightbuddy.git
cd weightbuddy
copy .env.example .env
```

Abra o `.env` e coloque um usuário e senha de banco que você inventar (ex.: `meu_usuario` / `minha_senha_forte`). Esse arquivo é local, não vai pro Git.

## Passo 5 — Subir o banco

```powershell
docker compose up -d
docker compose ps
```

Esperado: `weightbuddy_postgres  Up ... (healthy)`. Não ficou healthy? `docker compose logs`.

> O container volta sozinho quando você abre o Docker Desktop. De novo só se você rodar `docker compose down`.

## Passo 6 — Rodar a app

```powershell
.\mvnw.cmd spring-boot:run
```

Ou dê **Run** no `WeightbuddyApplication` na IDE. Pra parar: `Ctrl+C`.

Testar a API:

```powershell
curl -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d '{\"nome\":\"Teste\",\"usuario\":\"teste\",\"senha\":\"senha1234\",\"email\":\"teste@email.com\"}'
```

## Comandos úteis

| Comando | O que faz |
|---|---|
| `docker compose ps` | Status dos containers |
| `docker compose logs` | Logs do Postgres |
| `docker compose down` | Para (dados ficam salvos) |
| `docker compose down -v` | Para **e apaga os dados** (cuidado) |

## Problemas comunes

- **App não conecta / erro de `${POSTGRES_USER}`** → Docker aberto? `.env` existe na raiz? `docker compose ps` mostra healthy?
- **Port 8080 already in use** → JVM antiga rodando: feche (Ctrl+C) ou mate o processo `java`
- **Port 5432 already allocated** → tem outro Postgres na máquina: pare o serviço "postgresql" do Windows
- **JDK reclama no build** → é o Enforcer do `pom.xml` exigindo 21+; instale o JDK e configure o SDK do IntelliJ (File → Project Structure → SDKs)
- **Trocou a senha no `.env`** → `docker compose down -v && docker compose up -d` (**apaga os dados locais**)
