# base
FROM node:18-alpine AS base

RUN npm i -g pnpm

# dependencies
FROM base AS dependencies

WORKDIR /jblog-frontend
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# build
FROM dependencies AS build
WORKDIR /jblog-frontend
COPY . .
COPY --from=dependencies /jblog-frontend/node_modules ./node_modules
RUN pnpm run build
RUN pnpm prune --prod

# production
FROM base AS production

WORKDIR /jblog-frontend
COPY --from=build /jblog-frontend/.next ./.next
COPY --from=dependencies /jblog-frontend/node_modules ./node_modules
COPY package.json ./

CMD [ "npm", "start" ]
