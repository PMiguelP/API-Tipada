FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache curl tini && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs
COPY package*.json ./
COPY prisma ./prisma/
COPY scripts/entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

FROM base AS development
RUN npm install --only=development
COPY . .
RUN npx prisma generate
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["./entrypoint.sh"]

FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build && \
    npx prisma generate

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3333

COPY --from=base /etc/passwd /etc/passwd
COPY --from=base /etc/group /etc/group

COPY --from=base /sbin/tini /sbin/tini

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

RUN chown -R nodejs:nodejs .
USER nodejs

EXPOSE 3333
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["./entrypoint.sh"]