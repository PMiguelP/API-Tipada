<div align="center"> <a href="https://fastify.dev/">
    <img
      src="https://github.com/fastify/graphics/raw/HEAD/fastify-landscape-outlined.svg"
      width="650"
      height="auto"
    />
  </a>
</div>

# API REST com Fastify e TypeScript

Uma API REST moderna construída com Fastify, TypeScript, e Prisma, fornecendo documentação automática via Swagger.

## 📋 Pré-requisitos

- Node.js (v20 ou superior)
- Docker e Docker Compose
- Git

## 🚀 Começar

### 1. Clonar o Repositório

```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd [NOME_DO_DIRETORIO]
```

### 2. Configuração do Ambiente

Crie um ficheiro `.env` na raiz do projeto para o ambiente de produção:

```env
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=nome_do_banco
```

### 3. Scripts Disponíveis

#### Desenvolvimento

```bash
# Iniciar em modo desenvolvimento com Docker
npm run docker:dev

# Parar os contentores de desenvolvimento
npm run docker:dev:down

# Ver logs dos contentores
npm run docker:logs
```

#### Produção

```bash
# Iniciar em modo produção
npm run docker:prod

# Parar os contentores de produção
npm run docker:prod:down
```

#### Gestão do Docker

```bash
# Limpar volumes e contentores
npm run docker:clean

# Limpar todos os recursos Docker não utilizados
npm run docker:prune
```

#### Prisma

```bash
# Gerar cliente Prisma
npm run prisma:generate

# Executar migrações
npm run prisma:migrate
```

## 🏗️ Estrutura do Projeto

```
├── src/
│   ├── server.ts        # Configuração do servidor Fastify
│   └── routes/          # Rotas da API
├── prisma/
│   └── schema.prisma    # Schema do Prisma
├── docker-compose.dev.yml   # Configuração Docker para desenvolvimento
├── docker-compose.prod.yml  # Configuração Docker para produção
└── Dockerfile           # Configuração multi-stage do Docker
```

## 🛠️ Funcionalidades

- Servidor Fastify com TypeScript
- Validação de tipos com Zod
- Documentação Swagger automática
- CORS configurado
- Gestão de erros centralizada
- Healthcheck endpoint
- Conteniorização com Docker
- ORM com Prisma

## 📚 Documentação API

Após iniciar o servidor, aceda à documentação Swagger em:

```
http://localhost:3333/docs
```

## 🔍 Endpoints Principais

- `GET /health`: Verificação do estado do servidor
- `GET /docs`: Documentação Swagger
- Outros endpoints disponíveis em `/api/*`

## ⚙️ Variáveis de Ambiente

Para produção, certifique-se de configurar as seguintes variáveis no `.env`:

```env
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=nome_do_banco
```

## 🐳 Docker

O projeto utiliza multi-stage builds para otimização:

- **Desenvolvimento**: Utilizando hot-reload
- **Produção**: Build otimizado e configurações de segurança

## 🔒 Segurança

- Configuração CORS
- Validação de tipos com Zod
- Utilizador não-root no Docker
- Gestão de erros centralizada

## 📝 Notas

- Certifique-se de ter as portas 3333 e 5432 disponíveis
- Em desenvolvimento, as alterações são refletidas automaticamente
- Em produção, é necessário rebuildar a imagem para aplicar alterações

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor, crie um fork do projeto e submeta um PR com as suas alterações.

## Link da imagem do dokcer

https://hub.docker.com/repository/docker/pedropereira32168/api-tipada-full/general
