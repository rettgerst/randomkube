FROM node:10

WORKDIR /app/

COPY package*.json ./

RUN npm ci

COPY tsconfig.json .
COPY worker.ts .

RUN npm run build

CMD ["node", "dist/worker.js"]

EXPOSE 3030
