FROM node:22 AS builder

WORKDIR /app
RUN corepack enable && corepack prepare yarn@4.5.0

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./

COPY . .
RUN yarn install
RUN yarn prisma:generate
RUN yarn build



FROM node:22

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist

RUN corepack enable && corepack prepare yarn@4.5.0
RUN yarn workspaces focus --all --production
RUN yarn prisma:generate

EXPOSE 3000
CMD [ "sh", "-c", "yarn prisma:migrate:deploy && yarn start:prod" ]
