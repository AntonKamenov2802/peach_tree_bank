FROM node:current AS base

COPY . /build-files
WORKDIR /build-files/peach-tree-bank
RUN npm install
RUN npm run build
RUN apt update && apt install -y iproute2
#=== PRODUCTION ===#

FROM nginx AS prod
RUN mkdir /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=base /build-files/peach-tree-bank/dist /app

#=== DEVELOPMENT ===#

FROM base AS dev
RUN npm install
CMD ["npm", "run", "start"]