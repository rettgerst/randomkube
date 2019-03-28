FROM node:10

WORKDIR /app/

COPY package*.json ./

RUN npm ci

COPY tsconfig.json .
COPY server.ts .

RUN npm run build

CMD ["node", "dist/server.js"]

EXPOSE 3030