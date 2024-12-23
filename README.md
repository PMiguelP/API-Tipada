# Typed User Management API

A RESTful API for user management built with Node.js, Fastify, and PostgreSQL, featuring full type safety with Zod and Prisma.

## Features

- Fully typed CRUD operations
- OpenAPI/Swagger documentation
- Docker containerization with multi-stage builds
- PostgreSQL database with health checks
- Prisma ORM with type safety
- Request/Response validation with Zod
- Health monitoring
- Resource management and scaling
- Automatic database migrations

## Requirements

- Docker
- Docker Compose
- Node.js 20.x (for local development)
- npm or yarn

## Quick Start with Docker

1. Clone the repository:

```bash
git clone <your-repository-url>
cd <repository-name>
```

2. Start the application using Docker Compose:

```bash
docker-compose up -d
```

The services will be available at:

- API: `http://localhost:3333`
- Swagger Documentation: `http://localhost:3333/docs`
- PostgreSQL: `localhost:5432`

## Environment Configuration

The application uses the following environment variables:

```env
# Database
POSTGRES_USER=usuario
POSTGRES_PASSWORD=senha
POSTGRES_DB=nome_do_banco
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"

# API
PORT=3333
NODE_ENV=development
```

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file using the configuration above

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

## Project Structure

```
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── routes.ts      # API routes with Zod validation
│   ├── server.ts      # Fastify server configuration
│   └── types.ts       # Type definitions
├── Dockerfile         # Multi-stage build configuration
├── docker-compose.yml # Service orchestration
├── package.json
└── README.md
```

## Docker Configuration

### Building the Image

```bash
docker build -t pedropereira32168/api-tipada:1.0.0 .
```

### Running with Docker Compose

The docker-compose.yml includes:

- PostgreSQL 15 (Alpine-based)
- Node.js API service
- Health checks for both services
- Volume persistence for database
- Automatic database migrations
- Resource limits and monitoring

### Docker Image

Available on Docker Hub:

```bash
docker pull pedropereira32168/api-tipada:1.0.0
```

## API Documentation

Interactive API documentation is available through Swagger UI at `/docs` endpoint. This includes:

- Request/Response schemas
- Example payloads
- Authentication requirements (if any)
- Response codes

## Development Workflow

1. Create feature branch from `development`
2. Implement changes
3. Test locally with `npm run dev`
4. Build and test Docker setup
5. Push changes
6. Create PR to `development`

## Branch Strategy

- `development`: Development branch for ongoing work
- `production`: Production branch (v1.0.0) for stable releases

## Health Monitoring

The application includes health checks for:

- API service: Checks every 5s
- PostgreSQL: Checks every 5s with 5 retries

## Error Handling

The API includes standardized error responses for:

- Validation errors (400)
- Not found errors (404)
- Database errors
- Generic server errors (500)

## License

MIT
