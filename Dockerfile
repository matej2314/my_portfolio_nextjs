FROM node:24.1.0-slim AS builder

RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npx next build


FROM node:24.1.0-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5055

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# COPY --from=builder /app/prisma ./prisma

EXPOSE 5055

CMD ["npx", "next", "start", "-p", "5055"]
