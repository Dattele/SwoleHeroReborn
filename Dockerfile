# Build stage
ARG NODE_VERSION=24.15.0-alpine

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY package*.json .

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
