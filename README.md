### 📋 **README.md**

# 🛠️ Projeto Big Chat Brasil

Este é um projeto utilizando **NestJS** com **PostgreSQL** como banco de dados, gerenciado através do **Prisma**. O ambiente é configurado para rodar em containers com **Docker**.

---

## 🚀 **Iniciando o Projeto**

### 1. **Clonar o repositório e instalar dependências:**

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
npm install
```

---

### 2. **Configurar variáveis de ambiente:**

- Crie um arquivo `.env` na raíz do projeto de acordo com o arquivo `.env.example`.
- Configure as variáveis de acordo com seu ambiente.

---

### 3. **Inicializar o banco de dados com Docker:**

- Execute o comando abaixo para iniciar os containers:

```bash
docker-compose up -d
```

---

### 4. **Acessar o pgAdmin4:**

- Acesse: [http://localhost:5050](http://localhost:5050)

**Configuração do server no pgAdmin:**

- **Host name/address:** `db`
- **Port:** `5432`
- **Maintenance database:** `postgres`
- **Username:** `postgres`
- **Password:** `postgres`

---

### 5. **Executar migrations com Prisma:**

```bash
npx prisma migrate dev --name init
```

---

### 6. **Iniciar a API:**

```bash
npm run start:dev
```

---

## 📋 **Rotas da API**

### 🔒 **Autenticação (`/auth`):**

| Método | Endpoint       | Descrição                            |
| ------ | -------------- | ------------------------------------ |
| POST   | `/auth/signup` | Cria um novo usuário                 |
| POST   | `/auth/signin` | Autentica um usuário                 |
| GET    | `/auth/me`     | Retorna dados do usuário autenticado |

---

### ✉️ **Mensagens (`/messages`):**

| Método | Endpoint                 | Descrição                                |
| ------ | ------------------------ | ---------------------------------------- |
| POST   | `/messages/add-credits`  | Adiciona créditos ao usuário autenticado |
| POST   | `/messages/update-limit` | Atualiza o limite de mensagens           |
| POST   | `/messages/pay-bill`     | Realiza o pagamento de fatura            |
| POST   | `/messages/send-message` | Envia uma mensagem                       |

---
