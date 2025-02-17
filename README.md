## Setup do projeto de backend

### Pré-requisitos

O que você precisa para configurar o projeto:

- [NPM](https://www.npmjs.com/)
- [Node](https://nodejs.org/en/) `>=22.0.0` (Instale usando [NVM](https://github.com/nvm-sh/nvm))
- [Docker Compose](https://docs.docker.com/compose/)

### Setup

1. **Instale o Docker e o Docker Compose**, caso ainda não tenha.

2. Crie um arquivo .env seguindo as instruções de .envSample.

3. Suba os serviços necessários (PostgreSQL e Redis) com:
   ```bash
   docker-compose up -d
   ```
4. Instale as dependências do projeto:
   ```bash
   nvm use && npm install
   ```
5. Configure o banco de dados:
   ```bash
   npm run db:migrate && npm run db:seed
   ```
6. Inicie o servidor:
   ```bash
   npm run start:dev
   ```
7. Acesse o **Playground do GraphQL**:
   - 👉 [http://localhost:3000/graphql](http://localhost:3000/graphql)

### Tests

Para rodar os testes:

```bash
npm run test
```

### Migrations

Caso precise criar novas migrations, utilize o comando:

```bash
npm run db:create_migration --name=create-xpto-table
```


# Mudanças

## Problemas
- Foi adicionada uma prevenção à SQL Injection.
- Algumas credênciais que estavam expostas no código fonte, foram removidas e colocadas em um .env.
- Algumas propriedades do banco como 'introspection' e 'playground' foram removidas do ambiente de produção.

## Melhorias
- Foram feitas melhorias na legibilidade do código para facilitar sua manutenção.
- Foram adicionados mais alguns testes.
- Foi Adicionado suporte ao formato 'txt'.
- Testes e códigos refatorados para melhorar a escalabilidade.
- Solucionado bug no caminho dos pacotes.
