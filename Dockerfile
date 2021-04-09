FROM node:15-alpine

WORKDIR /opt/wine-cellar

RUN mkdir ./database-files
RUN chown -R node ./database-files
VOLUME /opt/wine-cellar/database-files

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV="production" PORT=8080

USER node

EXPOSE 8080

CMD ["node", "./build/app.js"]