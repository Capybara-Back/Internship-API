FROM node:21-alpine3.18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only-development
COPY . .

FROM builder AS dev
CMD ["npm", "run", "dev"]

FROM builder AS production
RUN npm ci --only-production
COPY dist ./dist
CMD ["npm", "start"]
