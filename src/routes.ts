import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FastifyTypedInstance } from "./types";
import z from "zod";

const prisma = new PrismaClient();

export async function routes(app: FastifyTypedInstance) {
  app.get(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "Retrieve all users",
        response: {
          200: z
            .array(
              z.object({
                id: z.string(),
                name: z.string(),
                email: z.string().email(),
              })
            )
            .describe("List of users"),
        },
      },
    },
    async () => {
      return await prisma.user.findMany();
    }
  );

  app.post(
    "/users/register",
    {
      schema: {
        tags: ["users"],
        description: "Create a new user",
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z
            .object({
              message: z.string(),
            })
            .describe("User created successfully"),
          400: z
            .object({
              error: z.string(),
            })
            .describe("Validation error"),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;

      try {
        await prisma.user.create({
          data: { name, email },
        });
        return reply.status(201).send({ message: "User created successfully" });
      } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            return reply.status(400).send({ error: "Email already exists" });
          }
        }
        throw error;
      }
    }
  );

  app.put(
    "/users/update/:id",
    {
      schema: {
        tags: ["users"],
        description: "Update a user by ID",
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string().optional(),
          email: z.string().email().optional(),
        }),
        response: {
          200: z
            .object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
            })
            .describe("Updated user"),
          404: z
            .object({
              error: z.string(),
            })
            .describe("User not found"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { name, email } = request.body;

      try {
        const updatedUser = await prisma.user.update({
          where: { id },
          data: { name, email },
        });
        return reply.status(200).send(updatedUser);
      } catch (error: unknown) {
        return reply.status(404).send({ error: "User not found" });
      }
    }
  );

  app.delete(
    "/users/delete/:id",
    {
      schema: {
        tags: ["users"],
        description: "Delete a user by ID",
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
            })
            .describe("User deleted successfully"),
          404: z
            .object({
              error: z.string(),
            })
            .describe("User not found"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      try {
        await prisma.user.delete({ where: { id } });
        return reply.status(200).send({ message: "User deleted successfully" });
      } catch (error: unknown) {
        return reply.status(404).send({ error: "User not found" });
      }
    }
  );
}
