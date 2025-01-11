"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const zod_1 = __importDefault(require("zod"));
const prisma = new client_1.PrismaClient();
async function routes(app) {
    app.get("/users", {
        schema: {
            tags: ["users"],
            description: "Retrieve all users",
            response: {
                200: zod_1.default
                    .array(zod_1.default.object({
                    id: zod_1.default.string(),
                    name: zod_1.default.string(),
                    email: zod_1.default.string().email(),
                }))
                    .describe("List of users"),
            },
        },
    }, async () => {
        return await prisma.user.findMany();
    });
    app.get("/users/:id", {
        schema: {
            tags: ["users"],
            description: "Retrieve specific user by ID",
            params: zod_1.default.object({
                id: zod_1.default.string(),
            }),
            response: {
                200: zod_1.default
                    .object({
                    id: zod_1.default.string(),
                    name: zod_1.default.string(),
                    email: zod_1.default.string().email(),
                })
                    .describe("User found"),
                404: zod_1.default
                    .object({
                    error: zod_1.default.string(),
                })
                    .describe("User not found"),
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        try {
            const user = await prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                return reply.status(404).send({ error: "User not found" });
            }
            return reply.status(200).send(user);
        }
        catch (error) {
            return reply.status(500).send({ error: "Internal server error" });
        }
    });
    app.post("/users/register", {
        schema: {
            tags: ["users"],
            description: "Create a new user",
            body: zod_1.default.object({
                name: zod_1.default.string(),
                email: zod_1.default.string().email(),
            }),
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                })
                    .describe("User criado com sucesso"),
                400: zod_1.default
                    .object({
                    error: zod_1.default.string(),
                })
                    .describe("Validation error"),
            },
        },
    }, async (request, reply) => {
        const { name, email } = request.body;
        try {
            await prisma.user.create({
                data: { name, email },
            });
            return reply.status(201).send({ message: "User created successfully" });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return reply.status(400).send({ error: "Email already exists" });
                }
            }
            throw error;
        }
    });
    app.put("/users/update/:id", {
        schema: {
            tags: ["users"],
            description: "Update a user by ID",
            params: zod_1.default.object({
                id: zod_1.default.string(),
            }),
            body: zod_1.default.object({
                name: zod_1.default.string().optional(),
                email: zod_1.default.string().email().optional(),
            }),
            response: {
                200: zod_1.default
                    .object({
                    id: zod_1.default.string(),
                    name: zod_1.default.string(),
                    email: zod_1.default.string().email(),
                })
                    .describe("Updated user"),
                404: zod_1.default
                    .object({
                    error: zod_1.default.string(),
                })
                    .describe("User not found"),
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const { name, email } = request.body;
        try {
            const updatedUser = await prisma.user.update({
                where: { id },
                data: { name, email },
            });
            return reply.status(200).send(updatedUser);
        }
        catch (error) {
            return reply.status(404).send({ error: "User not found" });
        }
    });
    app.delete("/users/delete/:id", {
        schema: {
            tags: ["users"],
            description: "Delete a user by ID",
            params: zod_1.default.object({
                id: zod_1.default.string(),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                })
                    .describe("User deleted successfully"),
                404: zod_1.default
                    .object({
                    error: zod_1.default.string(),
                })
                    .describe("User not found"),
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        try {
            await prisma.user.delete({ where: { id } });
            return reply.status(200).send({ message: "User deleted successfully" });
        }
        catch (error) {
            return reply.status(404).send({ error: "User not found" });
        }
    });
}
//# sourceMappingURL=routes.js.map