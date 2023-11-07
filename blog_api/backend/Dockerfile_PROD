# Use the official Node.js runtime as the base image
FROM node:18-alpine3.17 as build

# Set the working directory in the container
WORKDIR /home/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Clean install dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine3.17 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /home/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/bin/www.js"]