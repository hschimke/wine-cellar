FROM node:15-alpine

WORKDIR /opt/wine-cellar

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV="production" PORT=8080

CMD ["node", "./build/app.js"]