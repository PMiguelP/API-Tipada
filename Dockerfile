
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY scripts/entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh


FROM base AS development
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["./entrypoint.sh"]

FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build
RUN npx prisma generate


FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3333

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

RUN chown -R nodejs:nodejs .
USER nodejs

EXPOSE 3333
CMD ["./entrypoint.sh"]