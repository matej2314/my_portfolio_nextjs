FROM node:24.1.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:24.1.0-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5055

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

EXPOSE 5055

CMD ["npm", "run", "prod"]
