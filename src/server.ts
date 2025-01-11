import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { routes } from "./routes";

const app = fastify({
  logger: true,
  ajv: {
    customOptions: {
      removeAdditional: false,
      useDefaults: true,
      coerceTypes: false,
      allErrors: true,
    },
  },
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Users Creation CRUD API",
      description: "Documentation for the Users CRUD API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

app.get(
  "/health",
  {
    schema: {
      description: "Health check endpoint",
      tags: ["Health"],
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" },
            timestamp: { type: "string" },
          },
        },
      },
    },
  },
  async () => {
    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
    };
  }
);

app.register(routes, { prefix: "/api" });

app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply.status(error.statusCode || 500).send({
    error: {
      message: error.message,
      statusCode: error.statusCode || 500,
    },
  });
});

const start = async () => {
  try {
    await app.listen({
      port: 3333,
      host: "0.0.0.0",
    });
    console.log("Server running at http://localhost:3333");
    console.log("Documentation available at http://localhost:3333/docs");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
