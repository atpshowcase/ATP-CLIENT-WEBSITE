FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund --fetch-retries=5 --fetch-retry-mintimeout=20000 --fetch-retry-maxtimeout=120000

COPY . .

RUN npm run build

EXPOSE 2007
CMD ["npx", "serve", "-s", "dist", "-l", "tcp://0.0.0.0:2007"]