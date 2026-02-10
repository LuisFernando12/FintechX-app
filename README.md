# 🚀 FintechX API

Backend desenvolvido em **NestJS** para uma aplicação do domínio financeiro (_fintech_), com arquitetura modular, integração com **MySQL**, suporte a **Docker** e foco em escalabilidade, organização e boas práticas.

O projeto serve como base para sistemas financeiros modernos, podendo evoluir para funcionalidades como autenticação, contas, transações, pagamentos e integrações externas.

---

## 🧠 Visão Geral

O **FintechX** é uma API REST construída em **TypeScript** utilizando o framework **NestJS**, seguindo princípios de:

- Arquitetura modular
- Separação de responsabilidades
- Configuração por ambiente
- Preparação para produção e escalabilidade

O projeto já está estruturado para rodar tanto localmente quanto em containers Docker.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **TypeScript**
- **MySQL**
- **Docker & Docker Compose**
- **pnpm**
- **dotenv**

---

## 📁 Estrutura do Projeto

```bash
fintechx-app/
├── src/                 # Código-fonte da aplicação
│   ├── app.module.ts    # Módulo principal
│   ├── main.ts          # Bootstrap da aplicação
│   └── modules/         # Módulos da aplicação (domínio)
├── dist/                # Build de produção
├── mysql_data/          # Volume de dados do MySQL
├── .env                 # Variáveis de ambiente
├── .env.template        # Template de variáveis de ambiente
├── docker-compose.yml   # Orquestração dos containers
├── Dockerfile           # Build da aplicação
├── package.json
└── README.md
```

---

## ⚙️ Configuração do Ambiente

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/LuisFernando12/FintechX-app.git
cd FintechX-app
```

---

### 2️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` baseado no template:

```bash
cp .env.template .env
```

Edite as variáveis conforme necessário (exemplo):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha
DB_NAME=fintechx
APP_PORT=3000
```

---

## ▶️ Executando o Projeto

### 🔹 Rodando com Docker (recomendado)

```bash
docker-compose up --build
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

---

### 🔹 Rodando localmente (sem Docker)

Instale as dependências:

```bash
pnpm install
```

Execute em modo desenvolvimento:

```bash
pnpm run start:dev
```

---

## 🧪 Scripts Disponíveis

```bash
pnpm run start         # Executa a aplicação
pnpm run start:dev     # Modo desenvolvimento
pnpm run build         # Gera build de produção
pnpm run start:prod    # Executa o build
```

---

## 🏗️ Arquitetura

- **Controllers**: Responsáveis pelas rotas HTTP
- **Services**: Contêm a lógica de negócio
- **Modules**: Organizam o domínio da aplicação
- **Configuração por ambiente** via `.env`

O projeto está preparado para crescimento modular e fácil manutenção.

## 👨‍💻 Autor

**Luis Fernando Silva Ferreira**  
Desenvolvedor Backend / Full Stack

- GitHub: https://github.com/LuisFernando12

---

## 📄 Licença

Este projeto é de uso educacional e profissional, podendo ser adaptado conforme necessidade.
