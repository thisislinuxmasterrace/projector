# projector-api

## setting up development environment

copy .env.example file to .env (at the root of the repo) and adjust variables to your setup:

```
# assuming you are in the api directory
cp ../.env.example ../.env
```

install dependencies and set up database:

```
yarn
docker compose -f ../docker-compose.development.yml up -d
yarn prisma:migrate:dev # if this command fails then DATABASE_URL is set to wrong value. for example you might need to change host of db to localhost.
```

## running the project

```
yarn start:dev
```

## please lint your project before committing changes

```
yarn format
yarn lint
```
