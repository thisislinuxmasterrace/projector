FROM node:22 AS builder

WORKDIR /app/build
RUN corepack enable && corepack prepare yarn@1.22.22+sha512.a6b2f7906b721bba3d67d4aff083df04dad64c399707841b7acf00f6b133b7ac24255f2652fa22ae3534329dc6180534e98d17432037ff6fd140556e2bb3137e

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./

RUN yarn install

COPY . .
RUN npx prisma generate
RUN yarn build
RUN yarn autoclean --force



FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/build/prisma ./prisma
COPY --from=builder /app/build/node_modules ./node_modules
COPY --from=builder /app/build/package*.json ./
COPY --from=builder /app/build/yarn.lock ./
COPY --from=builder /app/build/dist ./dist

EXPOSE 3000
CMD [ "yarn", "run", "start:prod" ]
