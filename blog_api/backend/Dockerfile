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

ENV PORT=3000
ENV CORS_HOST=http://localhost:5173
ENV REDIS_URL=redis://127.0.0.1:6379
ENV EXPRESS_SESSION_SECRET=3b0e3e39e567bcc4c0c102210ba190bacf30323960ec65c8913565d46550e67c
# REDIS_URL=redis://default:eaae44cd4f5642dba93aa138be991ce8@fly-wild-sunset-2931.upstash.io:6379
ENV MONGO=mongodb+srv://nv:M9RDqQgaEx9AGXPx@cluster0.bcb302o.mongodb.net/blog_api?retryWrites=true&w=majority

WORKDIR /home/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /home/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/bin/www.js"]