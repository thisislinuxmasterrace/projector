FROM node:22 AS builder

WORKDIR /app
RUN corepack enable && corepack prepare yarn@4.5.0

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./

RUN yarn install --immutable

COPY . .
RUN npx prisma generate
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production --immutable



FROM node:22

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "sh", "-c", "npx prisma migrate deploy && node dist/main" ]
