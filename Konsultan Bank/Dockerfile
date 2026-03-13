FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 2007
CMD ["npx", "serve", "-s", "dist", "-l", "tcp://0.0.0.0:2007"]
