# User Management API

A RESTful API for user management built with Node.js, Fastify, and PostgreSQL.

## Features

- User CRUD operations
- OpenAPI/Swagger documentation
- Docker containerization
- PostgreSQL database
- Prisma ORM
- Input validation with Zod

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

The API will be available at `http://localhost:3333`
Swagger documentation will be available at `http://localhost:3333/docs`

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

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
│   └── schema.prisma
├── src/
│   ├── routes.ts
│   ├── server.ts
│   └── types.ts
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## API Documentation

See [API.md](./API.md) for detailed endpoint documentation.

## Docker Image

The Docker image is available on Docker Hub:

```bash
docker pull <your-username>/<image-name>:1.0.0
```

## Testing the API

A Postman collection is included in the repository. To use it:

1. Import the `postman_collection.json` file into Postman
2. Update the base URL if necessary
3. Execute the requests

## Branch Strategy

- `development`: Development branch for ongoing work
- `production`: Production branch (v1.0.0) for stable releases

## License

MIT
