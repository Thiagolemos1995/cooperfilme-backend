# Step 1: Build the application
FROM node:20-alpine AS development

WORKDIR /app

# Install dependencies
COPY --chown=node:node package.json ./
COPY --chown=node:node tsconfig*.json ./
COPY yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY --chown=node:node . .

USER node

# Build the application
FROM node:20-alpine AS build

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node tsconfig*.json ./
COPY yarn.lock ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV production

RUN yarn install --production --frozen-lockfile && yarn cache clean

USER node

# Step 2: Create the production image
FROM node:20-alpine AS production

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --chown=node:node --from=build /app/node_modules ./node_modules

COPY --chown=node:node --from=build /app/dist ./dist

# Expose the application port
EXPOSE 3000

# Start the application
CMD node dist/main.js