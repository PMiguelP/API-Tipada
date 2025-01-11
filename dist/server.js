"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const cors_1 = require("@fastify/cors");
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const swagger_1 = require("@fastify/swagger");
const swagger_ui_1 = require("@fastify/swagger-ui");
const routes_1 = require("./routes");
const app = (0, fastify_1.fastify)().withTypeProvider();
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app.register(cors_1.fastifyCors, { origin: "*" });
app.register(swagger_1.fastifySwagger, {
    openapi: {
        info: {
            title: "Users creation crud ",
            version: "1.0.0",
        },
    },
    transform: fastify_type_provider_zod_1.jsonSchemaTransform,
});
app.register(swagger_ui_1.fastifySwaggerUi, {
    routePrefix: "/docs",
});
app.get("/", () => {
    return "hello world";
});
app.register(routes_1.routes);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
    console.log("HTTP server running");
});
//# sourceMappingURL=server.js.map