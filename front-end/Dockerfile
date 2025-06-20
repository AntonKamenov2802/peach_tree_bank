FROM node:current AS base

COPY . /build-files
WORKDIR /build-files/peach-tree-front-end
RUN npm install
RUN npm run build

#=== PRODUCTION ===#

FROM nginx AS prod

RUN mkdir /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=base /build-files/peach-tree-front-end/dist /app

#=== DEVELOPMENT ===#

FROM base AS dev