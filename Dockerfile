FROM node:24.1.0 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npx next build

FROM node:24.1.0 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5050

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 5050

CMD ["npx", "next", "start", "-p", "5050"]